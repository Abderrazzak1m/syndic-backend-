const { PrismaClient } = require('@prisma/client');
const contratService = require('./contratService');
const personneService = require('./personneService');
const prisma = new PrismaClient();

class DemandeLocationService {
  async getAllDemandesLocation() {
    return await prisma.demandeLocation.findMany({
    });
  }

  async getDemandeLocationById(id) {
    return await prisma.demandeLocation.findUnique({
      where: { id: parseInt(id) },
      include: {
        lot: {
          include: {
            immeuble: {
              include: {
                tranche: {
                  include: {
                    copropriete: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async createDemandeLocation(data) {
    const { 
      cinCoproprietaire, 
      lotId, 
      typeDemande, 
      procuration, 
      infoLocataire, 
      infoContrat 
    } = data;
    
    return await prisma.demandeLocation.create({
      data: { 
        cinCoproprietaire, 
        lotId, 
        typeDemande, 
        procuration, 
        infoLocataire, 
        infoContrat,
        status: "EN_ATTENTE"
      }
    });
  }

  async updateDemandeLocationStatus(id, status) {
    const demande = await prisma.demandeLocation.findUnique({
      where: { id: parseInt(id) }
    });

    if (!demande) {
      throw new Error('Demande not found');
    }

    // If accepting an "AJOUTER" request, create locataire and contrat
    if (status === "ACCEPTEE" && demande.typeDemande === "AJOUTER") {
      await this.processAjouterDemande(demande);
    }

    return await prisma.demandeLocation.update({
      where: { id: parseInt(id) },
      data: { status }
    });
  }

  async processAjouterDemande(demande) {
    const { infoLocataire, infoContrat, lotId, cinCoproprietaire } = demande;
    
    // Find coproprietaire by CIN
    const coproprietaire = await prisma.personne.findFirst({
      where: { cin: cinCoproprietaire }
    });

    if (!coproprietaire) {
      throw new Error('Coproprietaire not found');
    }
    const coproprieteId = coproprietaire.coproprieteId;
    console.log("coproprieteId", coproprieteId);

    // Create locataire in Personne table
    const locataireData = {
      ...infoLocataire,
      type: "locataire",
      statut: "active",
      coproprieteId: coproprieteId
    };

    console.log("locataireData", locataireData);

    const locataire = await personneService.createPersonne(
      {
        nom: locataireData.nom,
        prenom: locataireData.prenom,
        dateNaissance: locataireData.dateNaissance,
        adresse: locataireData.adresse,
        email: locataireData.email,
        telephone: locataireData.telephone,
        sexe: locataireData.sexe,
        nationalite: locataireData.nationalite,
        cin: locataireData.cin,
        type: "locataire",
        statut: "active",
        coproprieteId: coproprieteId
      }
    );

    // Create contrat
    const contratData = {
      lotId,
      locataireId: locataire.id,
      coproprietaireId: coproprietaire.id,
      dateCreation: infoContrat.dateCreation,
      dateExpiration: infoContrat.dateExpiration,
      procuration: infoContrat.procuration,
      Statut: "Validé"
    };

    await contratService.createContrat(contratData);

    // Update lot with locataire
    await prisma.lot.update({
      where: { id: lotId },
      data: { locataireId: locataire.id }
    });
  }

  async getDemandesByStatus(status) {
    return await prisma.demandeLocation.findMany({
      where: { status },
      include: {
        lot: {
          include: {
            immeuble: {
              include: {
                tranche: {
                  include: {
                    copropriete: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }
}

module.exports = new DemandeLocationService();