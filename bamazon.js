//npm requirements
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
  // run the displayGoods function after the connection is made

  displayGoods();
});

function displayGoods() {
  console.log("\n========================\n");
  //connect to the DB and get data to display to user
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
    //call the start function after the products are logged
    start();
  });
}

function start() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message:
          "What product would you like to buy? please use the product ID: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many units?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])

    .then(function(answer) {
      //store user input
      let chosenID = answer.id;
      let chosenUnits = answer.stock_quantity;

      connection.query(
        "SELECT price FROM bamazon WHERE id=? AND stock_quantity>?",
        [chosenID, chosenUnits],

        function(error, results) {
          if (error) throw error;
          // console.log(results);

          if (results.length === 0) {
            console.log("sorry, insufficient stock on hand!");
            displayGoods();
          }
          {
            "UPDATE bamazon SET stock_quantity=stock_quantity-? WHERE id=?",
              [chosenUnits, chosenID],
              function(error) {
                if (error) throw error;
              };
            // console.log(chosenUnits);
            // console.log(results[0].price);

            console.log("Amount Due: $" + chosenUnits * results[0].price);
            connection.end();
          }
        }
      );
    });
}
