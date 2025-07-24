const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

class OrdreJourService {
  // Create Ordre du jour for an existing AG
  async createOrdreJour(data) {
    const { assembleeId, objetOrdreJour, texteOrdreJour } = data;
    
    try {
      // Check if AG exists and doesn't already have an Ordre du jour
      const ag = await prisma.assembleeGenerale.findUnique({
        where: { id: parseInt(assembleeId) },
        include: { ordreJour: true }
      });

      if (!ag) {
        throw new Error('Assemblée Générale non trouvée');
      }

      if (ag.ordreJour) {
        throw new Error('Cette AG a déjà un ordre du jour associé');
      }

      const ordreJour = await prisma.ordreJour.create({
        data: {
          assembleeId: parseInt(assembleeId),
          objetOrdreJour,
          texteOrdreJour
        },
        include: {
          assemblee: {
            select: {
              id: true,
              numAG: true,
              enonce: true,
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
          }
        }
      });

      return ordreJour;
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'ordre du jour: ${error.message}`);
    }
  }

  // Get Ordre du jour by AG ID
  async getOrdreJourByAGId(assembleeId) {
    try {
      const ordreJour = await prisma.ordreJour.findUnique({
        where: { assembleeId: parseInt(assembleeId) },
        include: {
          assemblee: {
            select: {
              id: true,
              numAG: true,
              enonce: true,
              datePlanifiee: true,
              etat: true,
              tranche: {
                select: {
                  id: true,
                  intitulé: true,
                  copropriete: {
                    select: {
                      id: true,
                      nom: true,
                      adresse: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      if (!ordreJour) {
        throw new Error('Ordre du jour non trouvé pour cette AG');
      }

      return ordreJour;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'ordre du jour: ${error.message}`);
    }
  }

  // Get Ordre du jour by ID
  async getOrdreJourById(id) {
    try {
      const ordreJour = await prisma.ordreJour.findUnique({
        where: { id: parseInt(id) },
        include: {
          assemblee: {
            include: {
              tranche: {
                include: {
                  copropriete: {
                    select: {
                      id: true,
                      nom: true,
                      adresse: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      if (!ordreJour) {
        throw new Error('Ordre du jour non trouvé');
      }

      return ordreJour;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'ordre du jour: ${error.message}`);
    }
  }

  // Update Ordre du jour
  async updateOrdreJour(id, data) {
    try {
      const { objetOrdreJour, texteOrdreJour } = data;
      
      const ordreJour = await prisma.ordreJour.update({
        where: { id: parseInt(id) },
        data: {
          ...(objetOrdreJour && { objetOrdreJour }),
          ...(texteOrdreJour && { texteOrdreJour })
        },
        include: {
          assemblee: {
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
          }
        }
      });

      return ordreJour;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'ordre du jour: ${error.message}`);
    }
  }

  // Delete Ordre du jour
  async deleteOrdreJour(id) {
    try {
      await prisma.ordreJour.delete({
        where: { id: parseInt(id) }
      });
      return { message: 'Ordre du jour supprimé avec succès' };
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'ordre du jour: ${error.message}`);
    }
  }

  // Get all Ordres du jour by tranche ID
  async getOrdresJourByTrancheId(trancheId) {
    try {
      const ordresJour = await prisma.ordreJour.findMany({
        where: {
          assemblee: {
            trancheId: parseInt(trancheId)
          }
        },
        include: {
          assemblee: {
            select: {
              id: true,
              numAG: true,
              enonce: true,
              datePlanifiee: true,
              etat: true,
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
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return ordresJour;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des ordres du jour: ${error.message}`);
    }
  }
}


module.exports = new OrdreJourService()