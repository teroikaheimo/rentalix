-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema rentalix
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema rentalix
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `rentalix` DEFAULT CHARACTER SET latin1 ;
USE `rentalix` ;

-- -----------------------------------------------------
-- Table `rentalix`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rentalix`.`item` (
  `serial` INT(12) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) CHARACTER SET 'latin1' NOT NULL,
  `brand` VARCHAR(50) CHARACTER SET 'latin1' NULL DEFAULT NULL,
  `model` VARCHAR(50) CHARACTER SET 'latin1' NULL DEFAULT NULL,
  `info` VARCHAR(50) CHARACTER SET 'latin1' NULL DEFAULT NULL,
  `address` VARCHAR(70) CHARACTER SET 'latin1' NOT NULL,
  `owner` VARCHAR(50) CHARACTER SET 'latin1' NOT NULL,
  `category` VARCHAR(50) CHARACTER SET 'latin1' NULL DEFAULT NULL,
  `removed` BIT(1) NOT NULL DEFAULT b'0',
  `insert_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`serial`))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `rentalix`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rentalix`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) CHARACTER SET 'latin1' NOT NULL,
  `password` VARCHAR(100) CHARACTER SET 'latin1' NOT NULL,
  `admin` TINYINT(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`, `username`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `rentalix`.`reservation_rent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rentalix`.`reservation_rent` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_id` INT(12) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `start_date` DATETIME NULL DEFAULT NULL,
  `end_date` DATETIME NULL DEFAULT NULL,
  `reservation_start` DATETIME NOT NULL,
  `reservation_end` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `rent_user_id_idx` (`user_id` ASC),
  INDEX `rent_item_id_idx` (`item_id` ASC),
  CONSTRAINT `user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `rentalix`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `item_id_fk`
    FOREIGN KEY (`item_id`)
    REFERENCES `rentalix`.`item` (`serial`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;

USE `rentalix` ;

-- -----------------------------------------------------
-- Placeholder table for view `rentalix`.`arereserved`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rentalix`.`arereserved` (`id` INT, `item_id` INT, `user_id` INT, `start_date` INT, `end_date` INT, `reservation_start` INT, `reservation_end` INT);

-- -----------------------------------------------------
-- View `rentalix`.`arereserved`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rentalix`.`arereserved`;
USE `rentalix`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `rentalix`.`arereserved` AS select `rentalix`.`reservation_rent`.`id` AS `id`,`rentalix`.`reservation_rent`.`item_id` AS `item_id`,`rentalix`.`reservation_rent`.`user_id` AS `user_id`,`rentalix`.`reservation_rent`.`start_date` AS `start_date`,`rentalix`.`reservation_rent`.`end_date` AS `end_date`,`rentalix`.`reservation_rent`.`reservation_start` AS `reservation_start`,`rentalix`.`reservation_rent`.`reservation_end` AS `reservation_end` from `rentalix`.`reservation_rent` where ((now() <= `rentalix`.`reservation_rent`.`reservation_end`) and (`rentalix`.`reservation_rent`.`reservation_start` <= now()));

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
