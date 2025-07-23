const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const coproprietes = [
    {
      nom: 'Résidence Al Andalous',
      adresse: 'Avenue Mohammed V, Quartier Gueliz, Marrakech',
      description: 'Résidence moderne située au cœur de Marrakech.',
      budget: 150000,
      superficie: 12000,
      status: 'active'
    },
    {
      nom: 'Résidence Atlas View',
      adresse: 'Boulevard Zerktouni, Quartier Racine, Casablanca',
      description: 'Vue panoramique sur les montagnes de l’Atlas.',
      budget: 200000,
      superficie: 10000,
      status: 'active'
    },
    {
      nom: 'Résidence Les Palmiers',
      adresse: 'Rue des Orangers, Quartier Agdal, Rabat',
      description: 'Quartier calme et arboré avec tous les services.',
      budget: 180000,
      superficie: 9000,
      status: 'active'
    },
    {
      nom: 'Résidence Océan Bleu',
      adresse: 'Corniche Ain Diab, Casablanca',
      description: 'Accès direct à la plage et vues sur l’océan.',
      budget: 220000,
      superficie: 8500,
      status: 'active'
    },
    {
      nom: 'Résidence Jardin Royal',
      adresse: 'Avenue Hassan II, Quartier Hassan, Rabat',
      description: 'Résidence de standing au cœur de la capitale.',
      budget: 250000,
      superficie: 13000,
      status: 'active'
    },
    {
      nom: 'Résidence Montagne d\'Or',
      adresse: 'Route de l\'Ourika, Marrakech',
      description: 'Entourée de nature, idéale pour les familles.',
      budget: 160000,
      superficie: 8000,
      status: 'active'
    }
  ];

  for (const copropriete of coproprietes) {
    await prisma.copropriete.create({ data: copropriete });
  }
}

main()
  .then(() => {
    console.log('Seed completed');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
