-- -----------------------------------------------------
-- Use myfolio database
-- -----------------------------------------------------
USE myfolio;

-- -----------------------------------------------------
-- Add admin user
-- -----------------------------------------------------

INSERT INTO
    USER_TB
    (
        USER_ID,
        USER_NAME,
        USER_PW
    )
VALUES
    (
        'admin',
        'admin',
        'da8ce3f9a0db3b26741e864088b09d5c47be3442'
    );

INSERT INTO
    USER_TB
    (
        USER_ID,
        USER_NAME,
        USER_PW
    )
VALUES
    (
        'aboutus',
        'aboutus',
        'da8ce3f9a0db3b26741e864088b09d5c47be3442'
    );

INSERT INTO
    USER_TB
    (
        USER_ID,
        USER_NAME,
        USER_PW
    )
VALUES
    (
        'contactus',
        'contactus',
        'da8ce3f9a0db3b26741e864088b09d5c47be3442'
    );