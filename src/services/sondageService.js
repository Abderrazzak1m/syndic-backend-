const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class SondageService {
  // Create sondage for an existing AG
  async createSondage(data) {
    const { assembleId, enonceSondage, optionsDate, dureeHeures = 48 } = data;
    
    try {
      // Check if AG exists and doesn't already have a sondage
      const ag = await prisma.assembleeGenerale.findUnique({
        where: { id: parseInt(assembleId) },
        include: { sondage: true }
      });

      if (!ag) {
        throw new Error('Assemblée Générale non trouvée');
      }

      if (ag.sondage) {
        throw new Error('Cette AG a déjà un sondage associé');
      }

      const result = await prisma.$transaction(async (tx) => {
        // Create sondage
        const dateFin = new Date();
        dateFin.setHours(dateFin.getHours() + dureeHeures);

        const sondage = await tx.sondage.create({
          data: {
            enonceSondage: enonceSondage || `Sélectionnez la date qui vous convient pour l'AG: ${ag.enonce}`,
            dateFin,
            assembleId: parseInt(assembleId),
            statut: 'ACTIF'
          }
        });

        // Create date options
        const optionsCreated = await Promise.all(
          optionsDate.map(option => 
            tx.optionDate.create({
              data: {
                dateProposee: new Date(option.dateProposee),
                heureProposee: option.heureProposee,
                sondageId: sondage.id
              }
            })
          )
        );

        return {
          ...sondage,
          optionsDate: optionsCreated
        };
      });

      return result;
    } catch (error) {
      throw new Error(`Erreur lors de la création du sondage: ${error.message}`);
    }
  }

  // Get sondage by AG ID
  async getSondageByAGId(assembleId) {
    try {
      const sondage = await prisma.sondage.findUnique({
        where: { assembleId: parseInt(assembleId) },
        include: {
          assemblee: {
            select: {
              id: true,
              numAG: true,
              enonce: true,
              tranche: {
                select: {
                  id: true,
                  intitulé: true
                }
              }
            }
          },
          optionsDate: {
            orderBy: {
              dateProposee: 'asc'
            }
          }
        }
      });

      if (!sondage) {
        throw new Error('Sondage non trouvé pour cette AG');
      }

      return sondage;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du sondage: ${error.message}`);
    }
  }

  // Vote on a date option
  async voteOnOption(optionId) {
    try {
      const option = await prisma.optionDate.update({
        where: { id: parseInt(optionId) },
        data: {
          nbVotes: {
            increment: 1
          }
        },
        include: {
          sondage: {
            include: {
              assemblee: true
            }
          }
        }
      });

      return option;
    } catch (error) {
      throw new Error(`Erreur lors du vote: ${error.message}`);
    }
  }

  // Get sondage results
  async getSondageResults(sondageId) {
    try {
      const sondage = await prisma.sondage.findUnique({
        where: { id: parseInt(sondageId) },
        include: {
          assemblee: true,
          optionsDate: {
            orderBy: {
              nbVotes: 'desc'
            }
          }
        }
      });

      if (!sondage) {
        throw new Error('Sondage non trouvé');
      }

      const totalVotes = sondage.optionsDate.reduce((sum, option) => sum + option.nbVotes, 0);

      return {
        ...sondage,
        totalVotes,
        optionsDate: sondage.optionsDate.map(option => ({
          ...option,
          percentage: totalVotes > 0 ? ((option.nbVotes / totalVotes) * 100).toFixed(2) : 0
        }))
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des résultats: ${error.message}`);
    }
  }
}


module.exports = new SondageService();