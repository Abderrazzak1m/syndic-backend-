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

-- AddForeignKey
ALTER TABLE `proces_verbaux` ADD CONSTRAINT `proces_verbaux_assembleeId_fkey` FOREIGN KEY (`assembleeId`) REFERENCES `assemblees_generales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
