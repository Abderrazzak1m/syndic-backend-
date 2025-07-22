const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ContratService {
  async getContratsByCoproprieteId(coproprieteId) {
    return await prisma.contrat.findMany({
      where: {
        lot: {
          immeuble: {
            tranche: {
              coproprieteId: parseInt(coproprieteId)
            }
          }
        }
      },
      include: {
        lot: {
          include: {
            immeuble: {
              include: {
                tranche: true
              }
            }
          }
        },
        locataire: true,
        coproprietaire: true
      }
    });
  }

  async generateNumeroContratLocation() {
    const lastContrat = await prisma.contrat.findFirst({
      where: {
        numeroContratLocation: {
          startsWith: 'LOC'
        }
      },
      orderBy: {
        numeroContratLocation: 'desc'
      }
    });

    if (!lastContrat || !lastContrat.numeroContratLocation) {
      return 'LOC001';
    }

    const lastNumber = parseInt(lastContrat.numeroContratLocation.replace('LOC', ''));
    const nextNumber = lastNumber + 1;
    return `LOC${nextNumber.toString().padStart(3, '0')}`;
  }

  async createContrat(data) {
    const { 
      lotId, 
      locataireId, 
      coproprietaireId, 
      dateCreation, 
      dateExpiration, 
      procuration, 
      Statut 
    } = data;
    
    const numeroContratLocation = await this.generateNumeroContratLocation();
    
    return await prisma.contrat.create({
      data: { 
        lotId, 
        locataireId, 
        coproprietaireId, 
        dateCreation: new Date(dateCreation), 
        dateExpiration: dateExpiration ? new Date(dateExpiration) : null, 
        procuration, 
        numeroContratLocation, 
        Statut 
      },
      include: {
        lot: true,
        locataire: true,
        coproprietaire: true
      }
    });
  }

  async updateContrat(id, data) {
    const updateData = {};
    
    if (data.lotId !== undefined) updateData.lotId = data.lotId;
    if (data.locataireId !== undefined) updateData.locataireId = data.locataireId;
    if (data.coproprietaireId !== undefined) updateData.coproprietaireId = data.coproprietaireId;
    if (data.dateCreation !== undefined) updateData.dateCreation = new Date(data.dateCreation);
    if (data.dateExpiration !== undefined) {
      updateData.dateExpiration = data.dateExpiration ? new Date(data.dateExpiration) : null;
    }
    if (data.procuration !== undefined) updateData.procuration = data.procuration;
    if (data.Statut !== undefined) updateData.Statut = data.Statut;
    
    return await prisma.contrat.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        lot: true,
        locataire: true,
        coproprietaire: true
      }
    });
  }
}

module.exports = new ContratService();
