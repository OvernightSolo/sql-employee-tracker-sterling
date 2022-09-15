// Import dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to the database
const db = mysql.createConnection(
  {
    host: "localhost",
    port: 3001,
    user: "root",
    password: "password",
    database: "employees_db",
  },
  console.log("You are connected to the employees_db database")
);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL is connected");
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
          "View all role",
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
        case "View all role":
          viewAllrole();
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
    department.name AS Department
  FROM department`;

  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    firstPrompt();
  });
}

// role
function viewAllrole() {
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
    firstPrompt();
  });
}

//Employees
function viewAllEmployees() {
  let query = `SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS Department,
    role.salary,
    CONCAT(manager.first_name ' ', manager.last_name) AS Manager
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
    firstPrompt();
  });
}
