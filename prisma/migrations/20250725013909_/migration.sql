-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `role` ENUM('comptable', 'admin', 'entretien', 'rh') NOT NULL,
    `setupToken` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL,
    `setupTokenExpiry` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Copropriete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `budget` DOUBLE NOT NULL,
    `superficie` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tranche` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intitulé` VARCHAR(191) NOT NULL,
    `superficie` DOUBLE NOT NULL,
    `coproprieteId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Immeuble` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intitulé` VARCHAR(191) NOT NULL,
    `superficie` DOUBLE NOT NULL,
    `trancheId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intitulé` VARCHAR(191) NOT NULL,
    `superficie` DOUBLE NOT NULL,
    `etage` VARCHAR(191) NOT NULL,
    `quotePart` DOUBLE NOT NULL,
    `montantDu` DOUBLE NOT NULL,
    `coproprietaireId` INTEGER NULL,
    `locataireId` INTEGER NULL,
    `numeroContratLocation` VARCHAR(191) NULL,
    `numeroContratAcquisition` VARCHAR(191) NULL,
    `immeubleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EspaceCommun` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intitulé` VARCHAR(191) NOT NULL,
    `superficie` DOUBLE NOT NULL,
    `trancheId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Personne` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `dateNaissance` DATETIME(3) NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `sexe` VARCHAR(191) NOT NULL,
    `nationalite` VARCHAR(191) NOT NULL,
    `cin` VARCHAR(191) NOT NULL,
    `solde` DOUBLE NOT NULL DEFAULT 0.0,
    `type` VARCHAR(191) NOT NULL,
    `statut` VARCHAR(191) NOT NULL,
    `coproprieteId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Personne_email_key`(`email`),
    UNIQUE INDEX `Personne_cin_key`(`cin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contrat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotId` INTEGER NOT NULL,
    `locataireId` INTEGER NOT NULL,
    `coproprietaireId` INTEGER NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL,
    `dateExpiration` DATETIME(3) NULL,
    `procuration` BOOLEAN NOT NULL,
    `numeroContratLocation` VARCHAR(191) NULL,
    `Statut` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DemandeLocation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cinCoproprietaire` VARCHAR(191) NOT NULL,
    `lotId` INTEGER NOT NULL,
    `typeDemande` VARCHAR(191) NOT NULL,
    `procuration` BOOLEAN NOT NULL,
    `infoLocataire` JSON NOT NULL,
    `infoContrat` JSON NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assemblees_generales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numAG` VARCHAR(191) NOT NULL,
    `enonce` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `etat` ENUM('EN_ATTENTE', 'VALIDE', 'REFUSE') NOT NULL DEFAULT 'EN_ATTENTE',
    `datePlanifiee` DATETIME(3) NULL,
    `convocation` VARCHAR(191) NULL,
    `trancheId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `assemblees_generales_numAG_key`(`numAG`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sondages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enonceSondage` VARCHAR(191) NOT NULL,
    `statut` ENUM('ACTIF', 'TERMINE', 'ANNULE') NOT NULL DEFAULT 'ACTIF',
    `dateDebut` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateFin` DATETIME(3) NOT NULL,
    `assembleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `sondages_assembleId_key`(`assembleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `options_date` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateProposee` DATETIME(3) NOT NULL,
    `heureProposee` VARCHAR(191) NOT NULL,
    `sondageId` INTEGER NOT NULL,
    `nbVotes` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proces_verbaux` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assembleeId` INTEGER NOT NULL,
    `contenu` VARCHAR(191) NOT NULL,
    `enonce` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `proces_verbaux_assembleeId_key`(`assembleeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ordres_jour` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assembleeId` INTEGER NOT NULL,
    `objetOrdreJour` VARCHAR(191) NOT NULL,
    `texteOrdreJour` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ordres_jour_assembleeId_key`(`assembleeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tranche` ADD CONSTRAINT `Tranche_coproprieteId_fkey` FOREIGN KEY (`coproprieteId`) REFERENCES `Copropriete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Immeuble` ADD CONSTRAINT `Immeuble_trancheId_fkey` FOREIGN KEY (`trancheId`) REFERENCES `Tranche`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lot` ADD CONSTRAINT `Lot_coproprietaireId_fkey` FOREIGN KEY (`coproprietaireId`) REFERENCES `Personne`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lot` ADD CONSTRAINT `Lot_locataireId_fkey` FOREIGN KEY (`locataireId`) REFERENCES `Personne`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lot` ADD CONSTRAINT `Lot_immeubleId_fkey` FOREIGN KEY (`immeubleId`) REFERENCES `Immeuble`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EspaceCommun` ADD CONSTRAINT `EspaceCommun_trancheId_fkey` FOREIGN KEY (`trancheId`) REFERENCES `Tranche`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personne` ADD CONSTRAINT `Personne_coproprieteId_fkey` FOREIGN KEY (`coproprieteId`) REFERENCES `Copropriete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrat` ADD CONSTRAINT `Contrat_lotId_fkey` FOREIGN KEY (`lotId`) REFERENCES `Lot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrat` ADD CONSTRAINT `Contrat_locataireId_fkey` FOREIGN KEY (`locataireId`) REFERENCES `Personne`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrat` ADD CONSTRAINT `Contrat_coproprietaireId_fkey` FOREIGN KEY (`coproprietaireId`) REFERENCES `Personne`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assemblees_generales` ADD CONSTRAINT `assemblees_generales_trancheId_fkey` FOREIGN KEY (`trancheId`) REFERENCES `Tranche`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sondages` ADD CONSTRAINT `sondages_assembleId_fkey` FOREIGN KEY (`assembleId`) REFERENCES `assemblees_generales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `options_date` ADD CONSTRAINT `options_date_sondageId_fkey` FOREIGN KEY (`sondageId`) REFERENCES `sondages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proces_verbaux` ADD CONSTRAINT `proces_verbaux_assembleeId_fkey` FOREIGN KEY (`assembleeId`) REFERENCES `assemblees_generales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordres_jour` ADD CONSTRAINT `ordres_jour_assembleeId_fkey` FOREIGN KEY (`assembleeId`) REFERENCES `assemblees_generales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
