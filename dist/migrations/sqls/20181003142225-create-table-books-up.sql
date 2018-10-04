CREATE TABLE `books` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`category_original_id` int(11),
`original_id` int(11) NOT NULL,
`name` varchar(255) NOT NULL,
`image` varchar(255),
`stars` decimal(2, 1) NOT NULL DEFAULT 0,
`price` decimal(9, 2) NOT NULL DEFAULT 0,
`in_stock` tinyint(1) DEFAULT 0,
PRIMARY KEY (`id`),
UNIQUE KEY (`original_id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;
