/*
  Warnings:

  - You are about to alter the column `interval` on the `task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `interval` INTEGER NOT NULL;
