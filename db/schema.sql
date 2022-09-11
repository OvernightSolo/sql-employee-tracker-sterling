DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department (
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(30) NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE roles (
   id INT AUTO_INCREMENT,
   title VARCHAR(30) NOT NULL,
   salary DECIMAL NOT NULL,
   department_id INT NOT NULL,
   PRIMARY KEY (id)
   FOREIGN KEY (department_id)
   REFERENCES department(id)
   ON DELETE SET NULL
);

CREATE TABLE employee (
   id INT AUTO_INCREMENT NOT NULL,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT NOT NULL,
   manager_id INT NOT NULL,
   FOREIGN KEY (roles_id)
   REFERENCES employee_role(id),
   ON DELETE SET NULL
);