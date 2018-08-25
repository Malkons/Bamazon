
CREATE DATABASE bamazon_db;


USE bamazon_db;


CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
  
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pickaxe", "Tools", 5, 10), ("Shovel", "Tools", 3, 12), ("Axe", "Tools", 4, 10), ("Hoe", "Tools", 2, 15), ("Fishing Pole", "Tools", 5, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sword", "Weapons", 7, 5), ("Bow", "Weapons", 5, 6), ("Arrow", "Weapons", 1, 50), ("Shield", "Weapons", 4, 6), ("Trident", "Weapons", 8,1);

