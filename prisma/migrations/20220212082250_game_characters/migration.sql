/*
  Warnings:

  - You are about to drop the column `class` on the `GameCharacters` table. All the data in the column will be lost.
  - Added the required column `charclass` to the `GameCharacters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GameCharacters` DROP COLUMN `class`,
    ADD COLUMN `charclass` VARCHAR(191) NOT NULL;
