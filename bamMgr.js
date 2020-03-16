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
  menu();
});

//offer the manager choices of what to do
const menu = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View All Products for Sale":
          viewGoods();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addToInventory();
          break;

        case "Add New Product":
          addProduct();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
};

const viewGoods = () => {
  console.log("\n========================\n");
  //connect to the DB and get data to display to user
  connection.query("SELECT * FROM bamazon", function(error, results) {
    if (error) throw error;
    // console.log(results);

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
          results[i].price +
          "\n" +
          "Quantity: " +
          results[i].stock_quantity
      );
      console.log("\n========================\n");
    }
    menu();
  });
};

const lowInventory = () => {
  connection.query(
    "SELECT product_name FROM bamazon WHERE stock_quantity<5",
    function(error, results) {
      if (error) throw error;
      //   console.log(results);
      for (let i = 0; i < results.length; i++) {
        console.log(
          "Products with fewer than 5 units: " + results[i].product_name + "\n"
        );
      }
      menu();
    }
  );
};

const addToInventory = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message:
          "What product would you like to add inventory to? please use the product ID: ",
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
        message: "How many units do you want to add?",
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
        "UPDATE bamazon SET stock_quantity=stock_quantity+? WHERE id=?",
        [chosenUnits, chosenID],

        function(error, results) {
          if (error) throw error;
          console.log("you added to the inventory successfully!");
          menu();
        }
      );
    });
};

const addProduct = () => {};
