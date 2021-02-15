SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `taller_perez_db` DEFAULT CHARACTER SET utf8 ;
USE `taller_perez_db` ;


CREATE TABLE IF NOT EXISTS `taller_perez_db`.`customer` (
  `idCustomer` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `identification` VARCHAR(45) NOT NULL,
  `address` VARCHAR(60) NULL,
  `phone` VARCHAR(20) NOT NULL,
  `createdAt` DATE NULL,
  `updatedAt` DATE NULL,
  PRIMARY KEY (`idCustomer`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `taller_perez_db`.`car` (
  `idCar` BIGINT NOT NULL AUTO_INCREMENT,
  `customerId` BIGINT NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `year` INT NOT NULL,
  `engine` VARCHAR(45) NOT NULL,
  `createdAt` DATE NULL,
  `updatedAt` DATE NULL,
  PRIMARY KEY (`idCar`),
  INDEX `fk_car_customer_idx` (`customerId` ASC),
  CONSTRAINT `fk_car_customer`
    FOREIGN KEY (`customerId`)
    REFERENCES `taller_perez_db`.`customer` (`idCustomer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `taller_perez_db`.`diagnostic_analysis` (
  `idAnalysis` BIGINT NOT NULL AUTO_INCREMENT,
  `carId` BIGINT NOT NULL,
  `errorCode` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `status` VARCHAR(35) NULL DEFAULT 'pending',
  `createdAt` DATE NULL,
  `updatedAt` DATE NULL,
  PRIMARY KEY (`idAnalysis`),
  INDEX `fk_diagnostic_analysis_car1_idx` (`carId` ASC),
  CONSTRAINT `fk_diagnostic_analysis_car1`
    FOREIGN KEY (`carId`)
    REFERENCES `taller_perez_db`.`car` (`idCar`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
