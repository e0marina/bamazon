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

// const displayGoods = () => {

//offer the manager choices of what to do
function menu() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
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
}

function viewGoods() {
  console.log("\n========================\n");
  //connect to the DB and get data to display to user
  connection.query("SELECT * FROM bamazon", function(error, results) {
    if (error) throw error;
    console.log(results);

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
    menu();
  });
}
