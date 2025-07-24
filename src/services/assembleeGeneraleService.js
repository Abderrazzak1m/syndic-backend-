// services/assembleeGeneraleService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AssembleeGeneraleService {
  // Create new AG without sondage
   traduireEtat(etat) {
  switch (etat) {
    case 'EN_ATTENTE':
      return 'En attente';
    case 'VALIDE':
      return 'Validé';
    case 'REFUSE':
      return 'Refusé';
    default:
      return etat.toLowerCase();
  }
}

  async createAG(data) {
    const { trancheId, enonce, description } = data;
    
    try {
      const ag = await prisma.assembleeGenerale.create({
        data: {
          numAG: await this.generateAGNumber(),
          enonce,
          description,
          trancheId: parseInt(trancheId),
          etat: 'EN_ATTENTE'
        },
        include: {
          tranche: {
            select: {
              id: true,
              intitulé: true,
              copropriete: {
                select: {
                  id: true,
                  nom: true
                }
              }
            }
          }
        }
      });

      return ag;
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'AG: ${error.message}`);
    }
  }

  // Get AGs by tranche ID
async getAGsByTrancheId(trancheId) {
  try {
    const ags = await prisma.assembleeGenerale.findMany({
      where: { trancheId: parseInt(trancheId) },
      include: {
        tranche: {
          select: {
            id: true,
            intitulé: true,
            copropriete: {
              select: {
                id: true,
                nom: true
              }
            }
          }
        },
        sondage: {
          include: {
            optionsDate: true
          }
        },
        pv: true,
        ordreJour: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return ags.map(ag => {
      const sondage = ag.sondage;

      if (!sondage || !sondage.optionsDate || sondage.optionsDate.length === 0) {
        return {
          ...ag,
          etat: this.traduireEtat(ag.etat),
          datePlanifiee: null,
          sondageResult: null
        };
      }

      const totalVotes = sondage.optionsDate.reduce(
        (sum, option) => sum + (option.nbVotes ?? 0),
        0
      );

      const maxOption = sondage.optionsDate.reduce((max, option) => {
        return (option.nbVotes ?? 0) > (max.nbVotes ?? 0) ? option : max;
      }, sondage.optionsDate[0]);

      const highestPercentage = totalVotes > 0
        ? ((maxOption.nbVotes ?? 0) / totalVotes) * 100
        : 0;

      return {
        ...ag,
        etat: this.traduireEtat(ag.etat),
        datePlanifiee: maxOption.dateProposee,
        sondageResult: parseFloat(highestPercentage.toFixed(1))
      };
    });

  } catch (error) {
    throw new Error(`Erreur lors de la récupération des AGs: ${error.message}`);
  }
}

async  updateConvocation(agId, convocation ) {
  try {
    const updatedAG = await prisma.assembleeGenerale.update({
      where: { id: parseInt(agId) },
      data: {
        convocation: convocation ? convocation : null
      }
    });
    return updatedAG;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour de la convocation: ${error.message}`);
  }
}





  // get all Ag
async getAllAGs() {
  try {
    const ags = await prisma.assembleeGenerale.findMany({
      include: {
        tranche: {
          select: {
            id: true,
            intitulé: true,
            copropriete: {
              select: {
                id: true,
                nom: true
              }
            }
          }
        },
        sondage: {
          include: {
            optionsDate: true
          }
        },
        pv: true,
        ordreJour: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return ags.map(ag => {
      const sondage = ag.sondage;

      if (!sondage || !sondage.optionsDate || sondage.optionsDate.length === 0) {
        return {
          ...ag,
          etat: this.traduireEtat(ag.etat),
          datePlanifiee: null,
          sondageResult: null
        };
      }

      const totalVotes = sondage.optionsDate.reduce(
        (sum, option) => sum + (option.nbVotes ?? 0),
        0
      );

      const maxOption = sondage.optionsDate.reduce((max, option) => {
        return (option.nbVotes ?? 0) > (max.nbVotes ?? 0) ? option : max;
      }, sondage.optionsDate[0]);

      const highestPercentage = totalVotes > 0 
        ? ((maxOption.nbVotes ?? 0) / totalVotes) * 100 
        : 0;

      return {
        ...ag,
        etat: this.traduireEtat(ag.etat),
        datePlanifiee: maxOption.dateProposee,
        sondageResult: parseFloat(highestPercentage.toFixed(1))
      };
    });

  } catch (error) {
    throw new Error(`Erreur lors de la récupération des AGs: ${error.message}`);
  }
}

  // Generate AG number
  async generateAGNumber() {
    const currentYear = new Date().getFullYear();
    const lastAG = await prisma.assembleeGenerale.findFirst({
      where: {
        numAG: {
          startsWith: `AG-${currentYear}-`
        }
      },
      orderBy: {
        numAG: 'desc'
      }
    });

    let nextNumber = 1;
    if (lastAG) {
      const lastNumber = parseInt(lastAG.numAG.split('-')[2]);
      nextNumber = lastNumber + 1;
    }

    return `AG-${currentYear}-${nextNumber.toString().padStart(3, '0')}`;
  }

}


module.exports = new AssembleeGeneraleService()