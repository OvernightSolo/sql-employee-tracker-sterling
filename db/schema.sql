DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(30)
);

CREATE TABLE role (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(45) NOT NULL,
   salary DECIMAL NOT NULL,
   department_id INT,
   FOREIGN KEY (department_id)
   REFERENCES department(id)
);

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT NOT NULL,
   manager_id INT,
   FOREIGN KEY (manager_id)
   REFERENCES role(id)
);