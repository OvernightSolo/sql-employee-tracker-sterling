INSERT INTO department (name)
VALUES
   ("Accounting"),
   ("Analytics"),
   ("Digital"),
   ("Media");

INSERT INTO role (title, salary, department_id)
VALUES
   ("Manager", 100000, 4),
   ("Accountant", 60000, 1),
   ("Data Analyst", 70000, 2),
   ("Dig Content Coordinator", 80000, 3);

-- Manager
INSERT INTO employee (first_name, last_name, role_id)
VALUES
   ("Christena", "Garduno", 1);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
   ("Rachel", "Ford", 2, 1),
   ("Jared", "Harrington", 3, 1),
   ("Evelyn", "Maximo", 4, 1),
   ("Chris", "Stiner", 4, 1),
   ("Nuno", "Andrade", 3, 1),
   ("Robyn", "Warren", 2, 1);