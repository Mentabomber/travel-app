/*
  Warnings:

  - Added the required column `journeyId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `message` ADD COLUMN `journeyId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_journeyId_fkey` FOREIGN KEY (`journeyId`) REFERENCES `Journey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
