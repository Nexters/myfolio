-- -----------------------------------------------------
-- Use myfolio database
-- -----------------------------------------------------
USE myfolio;

-- -----------------------------------------------------
-- Add template
-- -----------------------------------------------------

INSERT INTO
	TEMPLATE_TB
	(
		TEMPLATE_TITLE,
		TEMPLATE_OWNER_USER_ID,
		TEMPLATE_DESCRIPTION
	)
VALUES
	(
		'template1',
		'admin',
		'Simple, Black, White, Blur, Gray'
	);


INSERT INTO
    TEMPLATE_TB
    (
        TEMPLATE_TITLE,
        TEMPLATE_OWNER_USER_ID,
        TEMPLATE_DESCRIPTION
    )
VALUES
    (
        'template2',
        'admin',
        'Line, White, Image'
    );


INSERT INTO
    TEMPLATE_TB
    (
        TEMPLATE_TITLE,
        TEMPLATE_OWNER_USER_ID,
        TEMPLATE_DESCRIPTION
    )
VALUES
    (
        'template3',
        'admin',
        'Vertical, Various, Circle'
    );