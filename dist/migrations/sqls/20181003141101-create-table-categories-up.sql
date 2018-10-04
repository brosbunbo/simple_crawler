CREATE TABLE `categories` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`parent_id` int(11),
`original_id` int(11) NOT NULL,
`name` varchar(255) NOT NULL,
`path` varchar(255) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY (`original_id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;
