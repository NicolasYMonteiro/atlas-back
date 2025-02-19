/*
  Warnings:

  - You are about to alter the column `verif` on the `multipleTask` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `multipleTask` MODIFY `verif` BOOLEAN NOT NULL;
