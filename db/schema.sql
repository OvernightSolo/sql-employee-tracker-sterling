DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(30) NOT NULL,
);

CREATE TABLE roles (
   id INT AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(45) NOT NULL,
   salary DECIMAL NOT NULL,
   department_id INT NOT NULL,
   FOREIGN KEY (department_id)
   REFERENCES department(id)
   ON DELETE SET NULL
);

CREATE TABLE employee (
   id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT NOT NULL,
   manager_id INT,
   FOREIGN KEY (manager_id)
   REFERENCES roles(id),
   ON DELETE SET NULL
);