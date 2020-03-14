const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
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
  // run the displayGoods function after the connection is made

  displayGoods();
});

function displayGoods() {
  console.log("\n========================\n");
  connection.query("SELECT * FROM bamazon", function(error, results) {
    if (error) throw error;
    //loop through data and log id, product name, and price
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
    idSearch();
  });
}

function idSearch() {
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "What product would you like to buy? please use the product ID:"
    })
    .then(function(answer) {
      console.log("chosenID", answer.id);
      let chosenID = answer.id;
      let query = "SELECT * FROM bamazon WHERE ?";
      connection.query(query, { id: chosenID }, function(error, results) {
        if (error) throw error;
        // console.log("success! search by id");
        // console.log(results);

        for (let i = 0; i < results.length; i++) {
          console.log(
            "chosen ID: " + results[i].id + "\n===================\n"
          );
        }
      });
    });
}
