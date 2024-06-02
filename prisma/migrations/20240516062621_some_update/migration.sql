/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(24)`.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `email` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    ADD COLUMN `password` VARCHAR(18) NOT NULL DEFAULT '123456',
    MODIFY `name` VARCHAR(24) NOT NULL;
