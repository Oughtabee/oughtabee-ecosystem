DROP DATABASE IF EXISTS oughtabee;

CREATE DATABASE oughtabee CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;

USE `oughtabee`;

DROP TABLE IF EXISTS `pin`;
CREATE TABLE `pin` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
    `title` varchar(250) NOT NULL,
    `location` point NOT NULL,
    `json_data` json NOT NULL,
    `author` bigint(20) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` datetime NULL,
    PRIMARY KEY(id),
    SPATIAL INDEX `SPATIAL` (`location`)
);

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
    `parent` bigint(20) NOT NULL,
    `text` varchar(1000) NOT NULL,
	`json_data` json NOT NULL,
	`author` bigint(20) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` datetime NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
    `json_data` json NOT NULL,
    PRIMARY KEY (id)
)