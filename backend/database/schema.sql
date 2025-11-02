-- Database: db_hementrasane
-- User Information Table

CREATE DATABASE IF NOT EXISTS `db_hementrasane` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `db_hementrasane`;

-- User Information Table
CREATE TABLE IF NOT EXISTS `user_info` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(255) NOT NULL,
  `contact_number` VARCHAR(10) NOT NULL,
  `village_city` VARCHAR(255) NOT NULL,
  `district` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_contact_number` (`contact_number`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


