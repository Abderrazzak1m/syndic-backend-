const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EspaceCommunService {
  async getAllEspacesCommuns() {
    return await prisma.espaceCommun.findMany({
      include: {
        tranche: {
          include: {
            copropriete: true
          }
        }
      }
    });
  }

  async getEspaceCommunById(id) {
    return await prisma.espaceCommun.findUnique({
      where: { id: parseInt(id) },
      include: {
        tranche: {
          include: {
            copropriete: true
          }
        }
      }
    });
  }

  async createEspaceCommun(data) {
    const { intitulé, superficie, trancheId } = data;
    return await prisma.espaceCommun.create({
      data: { intitulé, superficie, trancheId },
      include: {
        tranche: true
      }
    });
  }

  async updateEspaceCommun(id, data) {
    const { intitulé, superficie, trancheId } = data;
    return await prisma.espaceCommun.update({
      where: { id: parseInt(id) },
      data: { intitulé, superficie, trancheId },
      include: {
        tranche: true
      }
    });
  }

  async deleteEspaceCommun(id) {
    return await prisma.espaceCommun.delete({
      where: { id: parseInt(id) }
    });
  }

  async getEspacesCommunsByTrancheId(trancheId) {
    return await prisma.espaceCommun.findMany({
      where: { trancheId: parseInt(trancheId) },
      include: {
        tranche: true
      }
    });
  }
}

module.exports = new EspaceCommunService();
