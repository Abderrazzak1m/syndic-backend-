const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

class PvService {
  // Create PV for an existing AG
  async createPv(data) {
    const { assembleeId, enonce, contenu } = data;
    
    try {
      // Check if AG exists and doesn't already have a PV
      const ag = await prisma.assembleeGenerale.findUnique({
        where: { id: parseInt(assembleeId) },
        include: { pv: true }
      });

      if (!ag) {
        throw new Error('Assemblée Générale non trouvée');
      }

      if (ag.pv) {
        throw new Error('Cette AG a déjà un PV associé');
      }

      const pv = await prisma.pv.create({
        data: {
          assembleeId: parseInt(assembleeId),
          enonce: enonce || `PV de l'AG: ${ag.enonce}`,
          contenu
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

      return pv;
    } catch (error) {
      throw new Error(`Erreur lors de la création du PV: ${error.message}`);
    }
  }

  // Get PV by AG ID
  async getPvByAGId(assembleeId) {
    try {
      const pv = await prisma.pv.findUnique({
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

      if (!pv) {
        throw new Error('PV non trouvé pour cette AG');
      }

      return pv;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du PV: ${error.message}`);
    }
  }

  // Get PV by ID
  async getPvById(id) {
    try {
      const pv = await prisma.pv.findUnique({
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

      if (!pv) {
        throw new Error('PV non trouvé');
      }

      return pv;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du PV: ${error.message}`);
    }
  }

  // Update PV
  async updatePv(id, data) {
    try {
      const { enonce, contenu } = data;
      
      const pv = await prisma.pv.update({
        where: { id: parseInt(id) },
        data: {
          ...(enonce && { enonce }),
          ...(contenu && { contenu })
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

      return pv;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du PV: ${error.message}`);
    }
  }

  // Delete PV
  async deletePv(id) {
    try {
      await prisma.pv.delete({
        where: { id: parseInt(id) }
      });
      return { message: 'PV supprimé avec succès' };
    } catch (error) {
      throw new Error(`Erreur lors de la suppression du PV: ${error.message}`);
    }
  }

  // Get all PVs by tranche ID
  async getPvsByTrancheId(trancheId) {
    try {
      const pvs = await prisma.pv.findMany({
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

      return pvs;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des PVs: ${error.message}`);
    }
  }
}

module.exports = new PvService()