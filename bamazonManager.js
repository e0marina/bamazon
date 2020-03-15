const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  //  username
  user: "root",

  //  password
  password: "Wolverines06!",
  database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
});
