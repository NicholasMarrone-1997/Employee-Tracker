DROP DATABASE IF EXISTS EmployeeTracker;

CREATE DATABASE EmployeeTracker;

USE EmployeeTracker;

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)

);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) ,
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (`name`)
VALUES ("Management"),
 ("Engineering"),
 ("Interning");

INSERT INTO role (`title`, `department_id`, `salary`)
VALUES ("Supervisor", 1, 3000),
    ("Engineer", 2, 2000),
    ("Intern", 3, 1000);


INSERT INTO employee (`first_name`, `last_name`, `role_id`, `manager_id`)
VALUES ("Anthony", "Cooper", 1, NULL),
       ("Nicholas", "Marrone", 2, 1),
       ("Max", "Alle", 1, 1),
       ("John", "Smith", 3, 3);

