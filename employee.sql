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
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary;
-- FROM employee

-- LEFT JOIN role
-- ON employee.role_id = role.id

-- LEFT JOIN department
-- ON department.id = role.department_id
-- ;

-- INSERT INTO songs(title, artist, genre)
-- VALUES("One", "Metallica", "Rock")

-- INSERT INTO songs(title, artist, genre)
-- VALUES("Movie", "Lil Uzi Vert", "Rap")

-- INSERT INTO songs(title, artist, genre)
-- VALUES("Diamonds", "Rhianna", "Hip-Hop")