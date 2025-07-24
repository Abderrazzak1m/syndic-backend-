-- CreateTable
CREATE TABLE `assemblees_generales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numAG` VARCHAR(191) NOT NULL,
    `enonce` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `etat` ENUM('EN_ATTENTE', 'VALIDE', 'REFUSE') NOT NULL DEFAULT 'EN_ATTENTE',
    `datePlanifiee` DATETIME(3) NULL,
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

-- AddForeignKey
ALTER TABLE `assemblees_generales` ADD CONSTRAINT `assemblees_generales_trancheId_fkey` FOREIGN KEY (`trancheId`) REFERENCES `Tranche`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sondages` ADD CONSTRAINT `sondages_assembleId_fkey` FOREIGN KEY (`assembleId`) REFERENCES `assemblees_generales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `options_date` ADD CONSTRAINT `options_date_sondageId_fkey` FOREIGN KEY (`sondageId`) REFERENCES `sondages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
