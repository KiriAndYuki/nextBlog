/*
  Warnings:

  - You are about to drop the column `bio` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sex` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `bio`,
    ADD COLUMN `desc` VARCHAR(191) NULL,
    ADD COLUMN `sex` ENUM('M', 'F') NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Post`;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('TEACHER', 'STUDENT') NOT NULL,
    `subject` ENUM('MATH', 'CHINESE', 'ENGLISH', 'HISTORY', 'POLITICS', 'PYSICAL', 'CHEMISTRY', 'BIOLOGY', 'GEOGRAPHY') NOT NULL,
    `grade` ENUM('PRIMARY', 'SENIOR') NOT NULL,
    `desc` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Order_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
