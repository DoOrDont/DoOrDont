DROP DATABASE IF EXISTS doordontdb;

CREATE DATABASE doordontdb;

USE doordontdb;

DROP TABLE IF EXISTS `users`;
		
CREATE TABLE `users` (
  `id` INTEGER AUTO_INCREMENT,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `goals`;
		
CREATE TABLE `goals` (
  `id` INTEGER AUTO_INCREMENT,
  `description` VARCHAR(50) NOT NULL,
  `punishment` VARCHAR(200) NOT NULL,
  `initiate` BOOLEAN NOT NULL,
  `frequency` INT NOT NULL,
  `counter` INT NOT NULL,
  `user_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `goals` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`) ON DELETE CASCADE;
