# Bamazon

#### Overview
This is a MySQL store front that uses the command line to promt users to purhcase items from a list of options.  

#### Directory layout

```
Bamazon
    - assets
        - images
    - node_modules
    - bamazon.sql
    - bamazonCustomer.js
    - package-lock.json
    - package.json

```

#### Setup
In order to get started you will need to have a few things:

1.  Clone the repo: [here](https://github.com/Malkons/Bamazon.git)
2.  Set up a MySQL database on your machine. Get it here : [MySQL](https://dev.mysql.com/downloads/mysql/)
3.  Get Workbench if you don't already have it: [WorkBench](https://www.mysql.com/products/workbench/)
4.  Create a database in MySQL called: bamazon_db, and use bamazon.sql to create a table filled with store inventory
7.  For the table layout install the npm module: [https://www.npmjs.com/package/cli-table](https://www.npmjs.com/package/cli-table)
5.  If you haven't already: [https://docs.npmjs.com/cli/install](https://docs.npmjs.com/cli/install)
6.  At the command line use `node bamazonCustomer.js` to start

#### Screenshots

Once node bamazonCustomer.js is running you will be promted to enter the ID number of the item.

![ScreenShot](assets/images/BamazonScreenShot.png)


Then you will be promted to enter a quanity, if there is enough in stock the order goes through
otherwise it the app will ask for an ID number.

![ScreenShot](assets/images/BamazonScreenShot2.png)
