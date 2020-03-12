var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Wolverines06!",
  database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made
  start();
});

function start() {
  console.log("\n========================\n");
  connection.query("SELECT * FROM bamazon", function(error, results, fields) {
    if (error) throw error;

    for (let i = 0; i < results.length; i++) {
      console.log(
        "id: " +
          results[i].id +
          "\n" +
          "Product Name: " +
          results[i].product_name +
          "\n" +
          "Price: " +
          results[i].price
      );
      console.log("\n========================\n");
    }
  });
}

// inquirer
//   .prompt({
//     name: "action",
//     type: "list",
//     message: "What would you like to do?",
//     choices: [
//       "Find songs by artist",
//       "Find all artists who appear more than once",
//       "Find data within a specific range",
//       "Search for a specific song",
//       "exit"
//     ]
//   })
