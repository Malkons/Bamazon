// DEPENDENCIES
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// Creating Connection Information
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "bamazon_db"
});

// Creating Connection  
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

//Start Function
function start() {
    connection.query("SELECT id, product_name, price, stock_quantity FROM products", function (err, res) {

        var table = new Table({
            head: ['Item Id#', 'Product Name', 'Price', '# In Stock'],
            style: {
                head: ['blue'],
                compact: false,
                colAligns: ['center'],
            }
        });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].price, res[i].stock_quantity]);
        }

        console.log(table.toString());
        // Inquirer Promt Getting Info From Customer
        inquirer.prompt([{
            name: "id",
            type: "input",
            message: "What would you like to buy? Enter Item ID#: ",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "units",
            type: "input",
            message: "How many would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
        ]).then(function (answer) {
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].id === parseInt(answer.id)) {
                    chosenItem = res[i];
                    checkStock(parseInt(answer.id), answer.units);
                }
            }
        }
        )
    });
}

// Check Stock Function
function checkStock(itemID, units) {
    connection.query("SELECT * FROM products WHERE ?", {
        id: itemID
    }, function (err, res) {
        if (err) throw err;

        if (res[0].stock_quantity < units) {
            console.log("Insufficient quantity! Please Try Again!");
            start();
        } else
            updateQuantity(itemID, units);
    });
}

// Update Stock Function
function updateQuantity(itemID, units) {
    connection.query("SELECT * FROM products WHERE ?", {
        id: itemID
    }, function (err, res) {
        if (err) throw err;

        var newQuantity = res[0].stock_quantity - units;

        if (newQuantity < 0)
            newQuantity = 0;

        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: newQuantity
        }, {
            id: itemID
        }], function (err, res) { });

        cost(itemID, units);
    });
}
// Total Cost Function
function cost(itemID, units) {
    connection.query("SELECT * FROM products WHERE ?", {
        id: itemID
    }, function (err, res) {
        if (err) throw err;

        var totalCost = res[0].price * units;
        
        console.log("You Purchased: " + units + " " + res[0].product_name);
        console.log("Total cost is $ " + totalCost);
        restart();
    });
}

function restart() {
    inquirer.prompt({
        name: "shopOrExit",
        type: "rawlist",
        message: "Would you like to [Shop] or [EXIT]?",
        choices: ["SHOP", "EXIT"]
      })
      .then(function(answer) {
        if (answer.shopOrExit.toUpperCase() === "SHOP") {
          start();
        }
        else {
          connection.end();
        }
      });
  }