create database testSpringHibernate;

use testSpringHibernate;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`)
);

INSERT INTO `users` (`user_id`,`username`,`password`,`email`) VALUES (16,'diego','diego','aa@ga,com');
INSERT INTO `users` (`user_id`,`username`,`password`,`email`) VALUES (17,'jose','jose','bbb');
INSERT INTO `users` (`user_id`,`username`,`password`,`email`) VALUES (18,'mavel','mavel','ccccc');
