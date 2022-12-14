// Import dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

// Connect to the database
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
});

db.connect((err) => {
  if (err) throw err;
  initialPrompt();
});

function initialPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
          "View all Departments",
          "View all Roles",
          "View all Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Remove an Employee",
          "Update an Employee Role",
          "Quit",
        ],
      },
    ])
    .then((res) => {
      console.log(res.userChoice);
      switch (res.userChoice) {
        case "View all Departments":
          viewAllDepartments();
          break;
        case "View all Roles":
          viewAllroles();
          break;
        case "View all Employees":
          viewAllEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Remove an Employee":
          removeEmployee();
          break;
        case "Update an Employee Role":
          updateEmployeeRole();
          break;
        case "Quit":
          db.end();
          break;
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}

// Departments
function viewAllDepartments() {
  let query = `SELECT
    department.id,
    department.name AS department
  FROM department`;

  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialPrompt();
  });
}

// Roles
function viewAllroles() {
  let query = `SELECT
    role.id,
    role.title AS Title,
    role.salary AS Salary,
    role.department_id
  FROM role
  LEFT JOIN department
    ON role.id = department.name
  `;

  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialPrompt();
  });
}

// Employees
function viewAllEmployees() {
  let query = `SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary
  FROM employee
  LEFT JOIN role
    ON employee.role_id = role.id
  LEFT JOIN department
    ON department.id = role.department_id
  LEFT JOIN employee manager
    ON manager.id = employee.manager_id`;

  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialPrompt();
  });
}

// Adding a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Department Name: ",
      },
    ])
    .then((res) => {
      let query = `INSERT INTO department SET ?`;
      db.query(query, { name: res.name }, (err, res) => {
        if (err) throw err;
        initialPrompt();
      });
    });
}

// Add a role
function addRole() {
  let query = `SELECT
    department.id,
    department.name,
    role.salary
  FROM employee
  JOIN role
    ON employee.role_id = role_id
  JOIN department
    ON department.id = role.department_id
  GROUP BY department.id, department.name`;

  db.query(query, (err, res) => {
    if (err) throw err;
    let department = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`,
    }));
    console.table(res);
    addToRole(department);
  });
}

function addToRole(department) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Title: ",
      },
      {
        type: "input",
        name: "salary",
        message: "Salary",
      },
      {
        type: "list",
        name: "department",
        message: "Department: ",
        choices: department,
      },
    ])
    .then((res) => {
      let query = `INSERT INTO role SET ?`;

      db.query(
        query,
        {
          title: res.title,
          salary: res.salary,
          department_id: res.department,
        },
        (err, res) => {
          if (err) throw err;
          initialPrompt();
        }
      );
    });
}

// Adding an employee
function addEmployee() {
  let query = `SELECT
    role.id,
    role.title,
    role.salary
  FROM role`;

  db.query(query, (err, res) => {
    if (err) throw err;
    let role = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);
    staffRoles(role);
  });
}

function staffRoles(role) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "First Name: ",
      },
      {
        type: "input",
        name: "lastName",
        message: "Last Name: ",
      },
      {
        type: "list",
        name: "roleId",
        message: "Role: ",
        choices: role,
      },
    ])
    .then((res) => {
      let query = `INSERT INTO employee SET ?`;
      db.query(
        query,
        {
          first_name: res.firstName,
          last_name: res.lastName,
          role_id: res.roleId,
        },
        (err, res) => {
          if (err) throw err;
          initialPrompt();
        }
      );
    });
}

// Update employee role
function updateEmployeeRole() {
  let query = `SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN role
    ON employee.role_id = role.id
  LEFT JOIN department
    ON role.department_id = department.id
  LEFT JOIN employee manager
    ON manager.id = employee.manager_id`;

  db.query(query, (err, res) => {
    if (err) throw err;
    let employee = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${first_name} ${last_name}`,
    }));
    console.table(res);
    updateRole(employee);
  });
}

function updateRole(employee) {
  let query = `SELECT
    role.id,
    role.title,
    role.salary
  FROM role`;

  db.query(query, (err, res) => {
    if (err) throw err;
    let roleChoices = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));
    console.table(res);
    getUpdatedRole(employee, roleChoices);
  });
}

function getUpdatedRole(employee, roleChoices) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Employee to be updated: ",
        choices: employee,
      },
      {
        type: "list",
        name: "role",
        message: "Select New Role: ",
        choices: roleChoices,
      },
    ])
    .then((res) => {
      let query = "UPDATE employee SET role_id = ? WHERE id = ?";
      db.query(query, [res.role, res.employee], (err, res) => {
        if (err) throw err;
        initialPrompt();
      });
    });
}

// Remove an employee
function removeEmployee() {
  let query = `SELECT
    employee.id,
    employee.first_name,
    employee.last_name
  FROM employee`;

  db.query(query, (err, res) => {
    if (err) throw err;
    let employee = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`,
    }));
    console.table(res);
    getDeletedEmp(employee);
  });
}

function getDeletedEmp(employee) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Employee to be removed: ",
        choices: employee,
      },
    ])
    .then((res) => {
      let query = `DELETE FROM employee WHERE ?`;
      db.query(query, { id: res.employee }, (err, res) => {
        if (err) throw err;
        initialPrompt();
      });
    });
}
