const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const lotCounts = {
  'Résidence Al Andalous': 45,
  'Résidence Atlas View': 28,
  'Résidence Les Palmiers': 32,
  'Résidence Océan Bleu': 18,
  'Résidence Jardin Royal': 52
};

function generateLotData(index, coproprietaireId, locataireId, immeubleId) {
  return {
    intitulé: `Lot ${100 + index}`,
    superficie: Math.floor(Math.random() * 50) + 50, // 50–100 m²
    etage: `${Math.floor(index / 10) + 1}`, // pseudo floor
    quotePart: parseFloat((Math.random() * 10).toFixed(2)),
    montantDu: Math.floor(Math.random() * 500000) + 500000, // 500k – 1M
    numeroContratLocation: `LOC${100 + index}`,
    numeroContratAcquisition: `ACQ${100 + index}`,
    coproprietaireId,
    locataireId,
    immeubleId
  };
}

async function main() {
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

    const numberOfLots = lotCounts[copro.nom] || 10; // fallback to 10 if not listed
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
