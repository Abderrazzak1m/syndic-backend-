const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PersonneService {
  async getAllPersonnes() {
    return await prisma.personne.findMany({
      include: {
        copropriete: true,
        lots: true,
        lotsLocataire: true
      }
    });
  }

  async getPersonneById(id) {
    return await prisma.personne.findUnique({
      where: { id: parseInt(id) },
      include: {
        copropriete: true,
        lots: {
          include: {
            immeuble: {
              include: {
                tranche: true
              }
            }
          }
        },
        lotsLocataire: {
          include: {
            immeuble: {
              include: {
                tranche: true
              }
            }
          }
        }
      }
    });
  }

  async createPersonne(data) {
    const { 
      nom, 
      prenom, 
      dateNaissance, 
      adresse, 
      email, 
      telephone, 
      sexe, 
      nationalite, 
      cin, 
      solde, 
      type, 
      statut, 
      coproprieteId 
    } = data;
    
    return await prisma.personne.create({
      data: { 
        nom, 
        prenom, 
        dateNaissance: new Date(dateNaissance),
        adresse, 
        email, 
        telephone, 
        sexe, 
        nationalite, 
        cin, 
        solde, 
        type, 
        statut, 
        coproprieteId 
      },
      include: {
        copropriete: true
      }
    });
  }

  async updatePersonne(id, data) {
    const { 
      nom, 
      prenom, 
      dateNaissance, 
      adresse, 
      email, 
      telephone, 
      sexe, 
      nationalite, 
      cin, 
      solde, 
      type, 
      statut, 
      coproprieteId 
    } = data;
    
    return await prisma.personne.update({
      where: { id: parseInt(id) },
      data: { 
        nom, 
        prenom, 
        dateNaissance: new Date(dateNaissance),
        adresse, 
        email, 
        telephone, 
        sexe, 
        nationalite, 
        cin, 
        solde, 
        type, 
        statut, 
        coproprieteId 
      },
      include: {
        copropriete: true
      }
    });
  }

  async deletePersonne(id) {
    return await prisma.personne.delete({
      where: { id: parseInt(id) }
    });
  }

  async getPersonnesByType(type) {
    return await prisma.personne.findMany({
      where: { type },
      include: {
        copropriete: true,
        lots: true,
        lotsLocataire: true
      }
    });
  }

  async getPersonnesByCopropriete(coproprieteId, type = null) {
    const whereClause = { coproprieteId: parseInt(coproprieteId) };
    if (type) {
      whereClause.type = type;
    }
    
    return await prisma.personne.findMany({
      where: whereClause
    });
  }
}

module.exports = new PersonneService();
