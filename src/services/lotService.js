const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class LotService {
  async getAllLots() {
    return await prisma.lot.findMany({
      include: {
        immeuble: {
          include: {
            tranche: {
              include: {
                copropriete: true
              }
            }
          }
        },
        coproprietaire: true,
        locataire: true
      }
    });
  }

  async getLotById(id) {
    return await prisma.lot.findUnique({
      where: { id: parseInt(id) },
      include: {
        immeuble: {
          include: {
            tranche: {
              include: {
                copropriete: true
              }
            }
          }
        },
        coproprietaire: true,
        locataire: true
      }
    });
  }

  async createLot(data) {
    const { 
      intitulé, 
      superficie, 
      etage, 
      quotePart, 
      montantDu, 
      immeubleId,
      coproprietaireId,
      locataireId,
      numeroContratLocation,
      numeroContratAcquisition
    } = data;
    
    return await prisma.lot.create({
      data: { 
        intitulé, 
        superficie, 
        etage, 
        quotePart, 
        montantDu, 
        immeubleId,
        coproprietaireId,
        locataireId,
        numeroContratLocation,
        numeroContratAcquisition
      },
      include: {
        coproprietaire: true,
        locataire: true,
        immeuble: true
      }
    });
  }

  async updateLot(id, data) {
    const { 
      intitulé, 
      superficie, 
      etage, 
      quotePart, 
      montantDu, 
      immeubleId,
      coproprietaireId,
      locataireId,
      numeroContratLocation,
      numeroContratAcquisition
    } = data;
    
    return await prisma.lot.update({
      where: { id: parseInt(id) },
      data: { 
        intitulé, 
        superficie, 
        etage, 
        quotePart, 
        montantDu, 
        immeubleId,
        coproprietaireId,
        locataireId,
        numeroContratLocation,
        numeroContratAcquisition
      },
      include: {
        coproprietaire: true,
        locataire: true,
        immeuble: true
      }
    });
  }

  async deleteLot(id) {
    return await prisma.lot.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = new LotService();
