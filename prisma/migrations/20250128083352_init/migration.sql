-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
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
CREATE TABLE `multipleTask` (
    `id` INTEGER NOT NULL,
    `idTask` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `verif` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recordTask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idTask` INTEGER NOT NULL,
    `record` LONGBLOB NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `multipleTask` ADD CONSTRAINT `multipleTask_idTask_fkey` FOREIGN KEY (`idTask`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recordTask` ADD CONSTRAINT `recordTask_idTask_fkey` FOREIGN KEY (`idTask`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
