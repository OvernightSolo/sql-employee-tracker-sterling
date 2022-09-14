INSERT INTO department (name)
VALUES
   ("Accounting"),
   ("Analytics"),
   ("Digital"),
   ("Media");

INSERT INTO roles (title, salary, department_id)
VALUES
   ("Manager", 100000, 4),
   ("Accountant", 60000, 1),
   ("Data Analyst", 70000, 2),
   ("Dig Content Coordinator", 80000, 3);

-- Manager
INSERT INTO employees (first_name, last_name, role_id)
VALUES
   ("Christena", "Garduno", 4);

-- Employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
   ("Rachel", "Ford", 2, 5),
   ("Jared", "Harrington", 3, 5),
   ("Evelyn", "Maximo", 4, 5);
   ("Chris", "Stiner", 4, 5);
   ("Nuno", "Andrade", 3, 5);
   ("Robyn", "Warren", 2, 5);