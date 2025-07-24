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
ALTER TABLE `ordres_jour` ADD CONSTRAINT `ordres_jour_assembleeId_fkey` FOREIGN KEY (`assembleeId`) REFERENCES `assemblees_generales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
