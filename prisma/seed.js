const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const lotCounts = {
  'Résidence Al Andalous': 45,
  'Résidence Atlas View': 28,
  'Résidence Les Palmiers': 32,
  'Résidence Océan Bleu': 18,
  'Résidence Jardin Royal': 52
};

const etatsAG = ['EN_ATTENTE', 'VALIDE', 'REFUSE'];
const statutSondage = ['ACTIF', 'TERMINE', 'ANNULE'];

async function seedAGs(trancheId) {
  for (let i = 1; i <= 7; i++) {
    const ag = await prisma.assembleeGenerale.create({
      data: {
        numAG: `AG-${Date.now()}-${i}`,
        enonce: `Assemblée Générale ${i}`,
        description: i % 2 === 0 ? `Description AG ${i}` : null,
        etat: etatsAG[i % etatsAG.length],
        trancheId,
        datePlanifiee: i % 3 === 0 ? new Date(`2025-08-${10 + i}`) : null,
        convocation: i % 2 === 1 ? `https://example.com/convocation${i}.pdf` : null,
      }
    });

    if (i <= 3) {
      await prisma.sondage.create({
        data: {
          enonceSondage: `Choisissez une date pour l'AG ${i}`,
          statut: statutSondage[i % statutSondage.length],
          dateDebut: new Date(),
          dateFin: new Date(Date.now() + 1000 * 60 * 60 * 48),
          assembleId: ag.id,
          optionsDate: {
            create: [
              {
                dateProposee: new Date(`2025-08-${10 + i}`),
                heureProposee: '18h30',
                nbVotes: 5 + i,
              },
              {
                dateProposee: new Date(`2025-08-${11 + i}`),
                heureProposee: '20h00',
                nbVotes: 2 + i,
              }
            ]
          }
        }
      });
    }

    if ([2, 4, 6].includes(i)) {
      await prisma.ordreJour.create({
        data: {
          assembleeId: ag.id,
          objetOrdreJour: `Objet de l'ordre du jour AG ${i}`,
          texteOrdreJour: `Texte détaillé de l'ordre du jour pour l'AG ${i}.`
        }
      });
    }

    if ([3, 5, 7].includes(i)) {
      await prisma.pv.create({
        data: {
          assembleeId: ag.id,
          enonce: `Procès-verbal de l'AG ${i}`,
          contenu: `Contenu du procès-verbal de l'AG ${i} qui s'est tenue à la date prévue.`
        }
      });
    }
  }
}

function generateLotData(index, coproprietaireId, locataireId, immeubleId) {
  return {
    intitulé: `Lot ${100 + index}`,
    superficie: Math.floor(Math.random() * 50) + 50,
    etage: `${Math.floor(index / 10) + 1}`,
    quotePart: parseFloat((Math.random() * 10).toFixed(2)),
    montantDu: Math.floor(Math.random() * 500000) + 500000,
    numeroContratLocation: `LOC${100 + index}`,
    numeroContratAcquisition: `ACQ${100 + index}`,
    coproprietaireId,
    locataireId,
    immeubleId
  };
}

async function main() {
  // 🔐 Création de l'utilisateur admin
  const hashedPassword = await bcrypt.hash('123456', 10);
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      fullName: 'Admin',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    }
  });

  console.log('✅ Admin user created');

  const coproprietes = await Promise.all([
    prisma.copropriete.create({ data: { nom: 'Résidence Al Andalous', adresse: 'Avenue Mohammed V, Quartier Gueliz, Marrakech', description: 'Résidence moderne située au cœur de Marrakech.', budget: 150000, superficie: 12000, status: 'active' } }),
    prisma.copropriete.create({ data: { nom: 'Résidence Atlas View', adresse: 'Boulevard Zerktouni, Quartier Racine, Casablanca', description: 'Vue panoramique sur les montagnes de l’Atlas.', budget: 200000, superficie: 10000, status: 'active' } }),
    prisma.copropriete.create({ data: { nom: 'Résidence Les Palmiers', adresse: 'Rue des Orangers, Quartier Agdal, Rabat', description: 'Quartier calme et arboré avec tous les services.', budget: 180000, superficie: 9000, status: 'active' } }),
    prisma.copropriete.create({ data: { nom: 'Résidence Océan Bleu', adresse: 'Corniche Ain Diab, Casablanca', description: 'Accès direct à la plage et vues sur l’océan.', budget: 220000, superficie: 8500, status: 'active' } }),
    prisma.copropriete.create({ data: { nom: 'Résidence Jardin Royal', adresse: 'Avenue Hassan II, Quartier Hassan, Rabat', description: 'Résidence de standing au cœur de la capitale.', budget: 250000, superficie: 13000, status: 'active' } }),
    prisma.copropriete.create({ data: { nom: 'Résidence Montagne d\'Or', adresse: 'Route de l\'Ourika, Marrakech', description: 'Entourée de nature, idéale pour les familles.', budget: 160000, superficie: 8000, status: 'active' } })
  ]);

  for (const copro of coproprietes) {
    const tranche = await prisma.tranche.create({
      data: {
        intitulé: 'Tranche A',
        superficie: Math.floor(copro.superficie / 2),
        coproprieteId: copro.id
      }
    });
    await seedAGs(tranche.id);

    const immeuble = await prisma.immeuble.create({
      data: {
        intitulé: 'Bâtiment Principal',
        superficie: Math.floor(copro.superficie / 2),
        trancheId: tranche.id
      }
    });

    const coproprietaire = await prisma.personne.create({
      data: {
        nom: 'Benali',
        prenom: 'Ahmed',
        dateNaissance: new Date('1980-05-15'),
        adresse: 'Rue Mohammed V, Casablanca',
        email: `ahmed.${copro.id}@email.ma`,
        telephone: '+212661234567',
        sexe: 'M',
        nationalite: 'Marocaine',
        cin: `CIN${copro.id}`,
        statut: 'Actif',
        solde: 10000,
        type: 'coproprietaire',
        coproprieteId: copro.id
      }
    });

    const locataire = await prisma.personne.create({
      data: {
        nom: 'Tazi',
        prenom: 'Youssef',
        dateNaissance: new Date('1990-03-10'),
        adresse: 'Marrakech',
        email: `youssef.${copro.id}@email.ma`,
        telephone: '+212663456789',
        sexe: 'M',
        nationalite: 'Marocaine',
        cin: `LOC${copro.id}`,
        statut: 'Actif',
        solde: 0,
        type: 'locataire',
        coproprieteId: copro.id
      }
    });

    const numberOfLots = lotCounts[copro.nom] || 10;
    const lots = Array.from({ length: numberOfLots }, (_, i) =>
      generateLotData(i, coproprietaire.id, locataire.id, immeuble.id)
    );

    await prisma.lot.createMany({ data: lots });
  }

  console.log('✅ Lots and copropriétés seeded correctly');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    return prisma.$disconnect();
  });
