const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CoproprieteService {
  async getAllCoproprietes() {
    return await prisma.copropriete.findMany({
      where: { status: 'active' },
      include: {
        tranches: true
      }
    });
  }

  async getArchivedCoproprietes() {
    return await prisma.copropriete.findMany({
      where: { status: 'archived' },
      include: {
        tranches: true
      }
    });
  }

  async getCoproprieteById(id) {
    return await prisma.copropriete.findUnique({
      where: { id: parseInt(id) },
      include: {
        tranches: {
          include: {
            immeubles: {
              include: {
                lots: true
              }
            },
            espaces: true
          }
        }
      }
    });
  }

  async createCopropriete(data) {
    const { nom, adresse, description, budget, superficie } = data;

    return await prisma.copropriete.create({
      data: { nom, adresse, description, budget, superficie, status: 'active' }
    });
  }

  async updateCopropriete(id, data) {
    const { nom, adresse, description, budget, superficie, status } = data;
    return await prisma.copropriete.update({
      where: { id: parseInt(id) },
      data: { nom, adresse, description, budget, superficie, status }
    });
  }

  async updateCoproprieteStatus(id, status) {
    return await prisma.copropriete.update({
      where: { id: parseInt(id) },
      data: { status }
    });
  }

  async deleteCopropriete(id) {
    return await prisma.copropriete.delete({
      where: { id: parseInt(id) }
    });
  }

  async getTranchesByCoproprieteId(coproprieteId) {
    return await prisma.tranche.findMany({
      where: { coproprieteId: parseInt(coproprieteId) },
      include: {
        immeubles: true,
        espaces: true
      }
    });
  }
}

module.exports = new CoproprieteService();
