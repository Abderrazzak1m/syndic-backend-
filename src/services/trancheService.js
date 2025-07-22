const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TrancheService {
  async getAllTranches() {
    return await prisma.tranche.findMany({
      include: {
        copropriete: true,
        immeubles: true,
        espaces: true
      }
    });
  }

  async getTrancheById(id) {
    return await prisma.tranche.findUnique({
      where: { id: parseInt(id) },
      include: {
        copropriete: true,
        immeubles: {
          include: {
            lots: true
          }
        },
        espaces: true
      }
    });
  }

  async createTranche(data) {
    const { intitulé, superficie, coproprieteId } = data;
    return await prisma.tranche.create({
      data: { intitulé, superficie, coproprieteId }
    });
  }

  async updateTranche(id, data) {
    const { intitulé, superficie, coproprieteId } = data;
    return await prisma.tranche.update({
      where: { id: parseInt(id) },
      data: { intitulé, superficie, coproprieteId }
    });
  }

  async deleteTranche(id) {
    return await prisma.tranche.delete({
      where: { id: parseInt(id) }
    });
  }

  async getImmeublesByTrancheId(trancheId) {
    return await prisma.immeuble.findMany({
      where: { trancheId: parseInt(trancheId) },
      include: {
        lots: true
      }
    });
  }
}

module.exports = new TrancheService();