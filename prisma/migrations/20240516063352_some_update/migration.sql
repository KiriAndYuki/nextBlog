/*
  Warnings:

  - You are about to alter the column `email` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(24)`.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[account]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profile` MODIFY `email` VARCHAR(24) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    ADD COLUMN `account` VARCHAR(24) NOT NULL,
    ADD COLUMN `nickName` VARCHAR(24) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_account_key` ON `User`(`account`);
