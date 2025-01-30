/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_idUser_fkey`;

-- DropForeignKey
ALTER TABLE `multipleTask` DROP FOREIGN KEY `multipleTask_idTask_fkey`;

-- DropForeignKey
ALTER TABLE `recordTask` DROP FOREIGN KEY `recordTask_idTask_fkey`;

-- DropIndex
DROP INDEX `multipleTask_idTask_fkey` ON `multipleTask`;

-- DropIndex
DROP INDEX `recordTask_idTask_fkey` ON `recordTask`;

-- DropTable
DROP TABLE `Task`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `emergency` BOOLEAN NOT NULL,
    `periodical` BOOLEAN NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `interval` VARCHAR(191) NOT NULL,
    `hour` VARCHAR(191) NOT NULL,
    `multiple` BOOLEAN NOT NULL,
    `dateCreator` DATETIME(3) NOT NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taskCompletion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `completion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `multipleTask` ADD CONSTRAINT `multipleTask_idTask_fkey` FOREIGN KEY (`idTask`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recordTask` ADD CONSTRAINT `recordTask_idTask_fkey` FOREIGN KEY (`idTask`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taskCompletion` ADD CONSTRAINT `taskCompletion_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
