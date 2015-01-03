CREATE TABLE `myfolio`.`User_TB` (
  `USER_ID` INT NOT NULL AUTO_INCREMENT,
  `USER_NAME` VARCHAR(20) NULL,
  `USER_PW` VARCHAR(128) NOT NULL,
  `USER_CREATE_TIME` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`USER_ID`),
  UNIQUE INDEX `ID_UNIQUE` (`USER_ID` ASC));