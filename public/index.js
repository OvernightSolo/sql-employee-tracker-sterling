// Imports
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
});
