// require, npm sql and inquirer
var inquirer = require('inquirer');
var mysql = require('mysql');
//check connection

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bamazon'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Let'shop")
  displayItems();
});

// connection.end();

// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
function displayItems() {
  connection.query("SELECT item_id, product_name, price FROM products", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    whatProduct();
  });
};

// 1st inquirer prompt: ask them the ID of the product they would like to buy.
function whatProduct() {
  inquirer
    .prompt({
      name: "id",
      type: 'input',
      message: "Enter the Id of the product you would like to buy"
    })
    .then(function (answer) {
      var query = "SELECT product_name, stock_quantity FROM products WHERE item_id = ?"
      connection.query(query, [answer.id], function (err, results) {
        console.log(results)
        console.log(answer.id)
        howMany();
      });

    });
};

// // 2nd inquirer prompt: ask how many units of the product they would like to buy
function howMany() {
  inquirer
    .prompt({
      name: "quantity",
      type: 'input',
      message: "how many would you like to purchase?"
    })
    .then(function (answer) {
        var query = "SELECT stock_quantity FROM products WHERE item_id = ?"
        connection.query(query, [answer.quantity], function (err, results, fields) {
     results.forEach((element, index) => {
      let name  = element.stock_quantity;
       });
       console.log(answer.quantity);
       placeOrder()
    });
  });
};
// customer places order
 
// if not enough product to meet request log "insufficent quantity", cancel request.

//else update databae and show customer total cost. 
