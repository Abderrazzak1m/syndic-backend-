const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ImmeubleService {
  async getAllImmeubles() {
    return await prisma.immeuble.findMany({
      include: {
        tranche: true,
        lots: true
      }
    });
  }

  async getImmeubleById(id) {
    return await prisma.immeuble.findUnique({
      where: { id: parseInt(id) },
      include: {
        tranche: {
          include: {
            copropriete: true
          }
        },
        lots: true
      }
    });
  }

  async createImmeuble(data) {
    const { intitulé, superficie, trancheId } = data;
    return await prisma.immeuble.create({
      data: { intitulé, superficie, trancheId }
    });
  }

  async updateImmeuble(id, data) {
    const { intitulé, superficie, trancheId } = data;
    return await prisma.immeuble.update({
      where: { id: parseInt(id) },
      data: { intitulé, superficie, trancheId }
    });
  }

  async deleteImmeuble(id) {
    return await prisma.immeuble.delete({
      where: { id: parseInt(id) }
    });
  }

  async getLotsByImmeubleId(immeubleId) {
    return await prisma.lot.findMany({
      where: { immeubleId: parseInt(immeubleId) }
    });
  }
}

module.exports = new ImmeubleService();