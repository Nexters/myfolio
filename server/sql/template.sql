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
	    TEMPLATE_ID,
		TEMPLATE_TITLE,
		TEMPLATE_OWNER_USER_ID,
		TEMPLATE_DESCRIPTION
	)
VALUES
	(
	    1,
		'template1',
		'admin',
		'Simple, Black, White, Blur, Gray'
	);


INSERT INTO
    TEMPLATE_TB
    (
        TEMPLATE_ID,
        TEMPLATE_TITLE,
        TEMPLATE_OWNER_USER_ID,
        TEMPLATE_DESCRIPTION
    )
VALUES
    (
        2,
        'template2',
        'admin',
        'Line, White, Image'
    );


INSERT INTO
    TEMPLATE_TB
    (
        TEMPLATE_ID,
        TEMPLATE_TITLE,
        TEMPLATE_OWNER_USER_ID,
        TEMPLATE_DESCRIPTION
    )
VALUES
    (
        3,
        'template3',
        'admin',
        'Vertical, Various, Circle'
    );