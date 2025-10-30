-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `perfil` VARCHAR(191) NOT NULL DEFAULT 'usuario',
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `usuarios` (nome,email,senha,perfil,ativo,createdAt,updatedAt) VALUES
	 ('Admin','admin@empresa.com','$2a$10$oGEhjszbiuf./arkLI4W7ekRDPx.GqVsQXywTW1aKNWPVx5CUkfAC','admin',1,'2025-10-29 11:57:23.717','2025-10-29 11:57:23.717');

