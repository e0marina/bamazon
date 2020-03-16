DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE bamazon
(
  id INT NOT NULL
  AUTO_INCREMENT,
  product_name VARCHAR
  (100) NULL,
  department_name VARCHAR
  (100) NULL,
  price DECIMAL
  (10,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY
  (id)
);
  INSERT INTO bamazon
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("record player", "electronics", 100.00, 100),
    ("iphone", "electronics", 600.00, 500),
    ("toilet paper", "paper goods", 30.00, 10),
    ("hand sanitizer", "toiletries", 50.00, 1),
    ("bottle of red wine", "grocery", 20.00, 102),
    ("oreo cookies", "grocery", 6.00, 200),
    ("sweater", "clothing", 40.00, 300),
    ("gatorade", "grocery", 3.00, 600),
    ("huggies diapers", "baby", 40.00, 100)