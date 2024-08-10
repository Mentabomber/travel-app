/*
  Warnings:

  - You are about to drop the `journeisonusers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `journeisonusers` DROP FOREIGN KEY `JourneisOnUsers_journeyId_fkey`;

-- DropForeignKey
ALTER TABLE `journeisonusers` DROP FOREIGN KEY `JourneisOnUsers_userId_fkey`;

-- DropTable
DROP TABLE `journeisonusers`;

-- CreateTable
CREATE TABLE `JourneysOnUsers` (
    `userId` INTEGER NOT NULL,
    `journeyId` INTEGER NOT NULL,
    `userType` VARCHAR(191) NOT NULL DEFAULT 'organizer',
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `journeyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JourneysOnUsers` ADD CONSTRAINT `JourneysOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JourneysOnUsers` ADD CONSTRAINT `JourneysOnUsers_journeyId_fkey` FOREIGN KEY (`journeyId`) REFERENCES `Journey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
