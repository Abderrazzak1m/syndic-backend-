const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed Copropriétés
  const coproprietes = await Promise.all([
    prisma.copropriete.create({
      data: {
        nom: 'Résidence Al Andalous',
        adresse: 'Avenue Mohammed V, Quartier Gueliz, Marrakech',
        description: 'Résidence moderne située au cœur de Marrakech.',
        budget: 150000,
        superficie: 12000,
        status: 'active'
      }
    }),
    prisma.copropriete.create({
      data: {
        nom: 'Résidence Atlas View',
        adresse: 'Boulevard Zerktouni, Quartier Racine, Casablanca',
        description: 'Vue panoramique sur les montagnes de l’Atlas.',
        budget: 200000,
        superficie: 10000,
        status: 'active'
      }
    }),
    prisma.copropriete.create({
      data: {
        nom: 'Résidence Les Palmiers',
        adresse: 'Rue des Orangers, Quartier Agdal, Rabat',
        description: 'Quartier calme et arboré avec tous les services.',
        budget: 180000,
        superficie: 9000,
        status: 'active'
      }
    }),
    prisma.copropriete.create({
      data: {
        nom: 'Résidence Océan Bleu',
        adresse: 'Corniche Ain Diab, Casablanca',
        description: 'Accès direct à la plage et vues sur l’océan.',
        budget: 220000,
        superficie: 8500,
        status: 'active'
      }
    }),
    prisma.copropriete.create({
      data: {
        nom: 'Résidence Jardin Royal',
        adresse: 'Avenue Hassan II, Quartier Hassan, Rabat',
        description: 'Résidence de standing au cœur de la capitale.',
        budget: 250000,
        superficie: 13000,
        status: 'active'
      }
    }),
    prisma.copropriete.create({
      data: {
        nom: 'Résidence Montagne d\'Or',
        adresse: 'Route de l\'Ourika, Marrakech',
        description: 'Entourée de nature, idéale pour les familles.',
        budget: 160000,
        superficie: 8000,
        status: 'active'
      }
    })
  ]);

  const coproprieteId = coproprietes[0].id;

  // Seed Tranches
  const trancheA = await prisma.tranche.create({
    data: {
      intitulé: 'Tranche A',
      superficie: 5000,
      coproprieteId
    }
  });

  const trancheB = await prisma.tranche.create({
    data: {
      intitulé: 'Tranche B',
      superficie: 3500,
      coproprieteId
    }
  });

  // Seed Immeubles
  const immeuble1 = await prisma.immeuble.create({
    data: {
      intitulé: 'Bâtiment A1',
      superficie: 1500,
      trancheId: trancheA.id
    }
  });

  await prisma.immeuble.create({
    data: {
      intitulé: 'Bâtiment A2',
      superficie: 1800,
      trancheId: trancheA.id
    }
  });

  // Seed Espaces Communs
  await prisma.espaceCommun.createMany({
    data: [
      {
        intitulé: 'Piscine',
        superficie: 200,
        trancheId: trancheA.id
      },
      {
        intitulé: 'Jardin',
        superficie: 800,
        trancheId: trancheA.id
      }
    ]
  });

  // Seed Personnes: Copropriétaires
  const coproprietaire1 = await prisma.personne.create({
    data: {
      nom: 'Benali',
      prenom: 'Ahmed',
      dateNaissance: new Date('1980-05-15'),
      adresse: 'Rue Mohammed V, Casablanca',
      email: 'ahmed.benali@email.ma',
      telephone: '+212661234567',
      sexe: 'M',
      nationalite: 'Marocaine',
      cin: 'AB123456',
      statut: 'Actif',
      solde: 15000,
      type: 'coproprietaire',
      coproprieteId
    }
  });

  await prisma.personne.create({
    data: {
      nom: 'Alami',
      prenom: 'Fatima',
      dateNaissance: new Date('1975-12-20'),
      adresse: 'Avenue Hassan II, Rabat',
      email: 'fatima.alami@email.ma',
      telephone: '+212662345678',
      sexe: 'F',
      nationalite: 'Marocaine',
      cin: 'EF789012',
      statut: 'Bloqué',
      solde: -5000,
      type: 'coproprietaire',
      coproprieteId
    }
  });

  // Seed Personnes: Locataires
  const locataire1 = await prisma.personne.create({
    data: {
      nom: 'Tazi',
      prenom: 'Youssef',
      dateNaissance: new Date('1990-03-10'),
      adresse: 'Boulevard Zerktouni, Quartier Racine, Marrakech',
      email: 'youssef.tazi@email.ma',
      telephone: '+212663456789',
      sexe: 'M',
      nationalite: 'Marocaine',
      cin: 'CD789012',
      statut: 'Actif',
      solde: 0,
      type: 'locataire',
      coproprieteId
    }
  });

  await prisma.personne.createMany({
    data: [
      {
        nom: 'Bennani',
        prenom: 'Khadija',
        dateNaissance: new Date('1985-07-22'),
        adresse: 'Avenue Hassan II, Quartier Agdal, Rabat',
        email: 'khadija.bennani@email.ma',
        telephone: '+212664567890',
        sexe: 'F',
        nationalite: 'Marocaine',
        cin: 'GH345678',
        statut: 'Actif',
        solde: -1200,
        type: 'locataire',
        coproprieteId
      },
      {
        nom: 'Fassi',
        prenom: 'Mehdi',
        dateNaissance: new Date('1992-11-05'),
        adresse: 'Rue Ibn Sina, Quartier Palmier, Casablanca',
        email: 'mehdi.fassi@email.ma',
        telephone: '+212665678901',
        sexe: 'M',
        nationalite: 'Marocaine',
        cin: 'IJ567890',
        statut: 'Bloqué',
        solde: -3500,
        type: 'locataire',
        coproprieteId
      }
    ]
  });

  // Seed Lots using createMany
  await prisma.lot.createMany({
    data: [
      {
        intitulé: 'Lot 101',
        superficie: 85,
        etage: '1',
        quotePart: 8.5,
        montantDu: 850000,
        numeroContratLocation: 'LOC001',
        numeroContratAcquisition: 'ACQ001',
        coproprietaireId: coproprietaire1.id,
        locataireId: locataire1.id,
        immeubleId: immeuble1.id
      },
      {
        intitulé: 'Lot 102',
        superficie: 90,
        etage: '2',
        quotePart: 9.0,
        montantDu: 900000,
        numeroContratLocation: 'LOC002',
        numeroContratAcquisition: 'ACQ002',
        coproprietaireId: coproprietaire1.id,
        locataireId: locataire1.id,
        immeubleId: immeuble1.id
      },
      {
        intitulé: 'Lot 103',
        superficie: 100,
        etage: '3',
        quotePart: 10.0,
        montantDu: 1000000,
        numeroContratLocation: 'LOC003',
        numeroContratAcquisition: 'ACQ003',
        coproprietaireId: coproprietaire1.id,
        locataireId: locataire1.id,
        immeubleId: immeuble1.id
      }
    ]
  });

  console.log('✅ Seed completed successfully');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    return prisma.$disconnect();
  });
