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
          viewAllRoles();
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
