DROP DATABASE IF EXISTS doordontdb;

CREATE DATABASE doordontdb;

USE doordontdb;

CREATE TABLE goals (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(200)  NOT NULL,
  punishment varchar(200) NOT NULL,
  frequency int NOT NULL,
  user_id INT,
    INDEX us_ind (user_id),
    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
  PRIMARY KEY (id)
);



CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(40) NOT NULL,
  password varchar(50) NOT NULL,
  PRIMARY KEY (id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/