const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'EmployeeTracker'
})

// function which prompts the user for what action they should take
const start = () => {
    inquirer
        .prompt({
            name: 'userChoice',
            type: 'list',
            message: 'Would you like to [ADD] an employee, department or role?',
            choices: ['addEmployee', 'addDepartment', 'EXIT'],
        })
        .then((answer) => {
            // based on their answer, do one of the below functions
            if (answer.userChoice === 'addEmployee') {
                // call to function that adds employee
                addEmployee();
            } else if (answer.userChoice === 'addDepartment') {
                // call to function that adds a department to an employee
                addDepartment();
            } else if (answer.userChoice === 'addRole') {
                // call to function that adds role to employee
                addRole();
            } else {
                connection.end();
            }
        });
};

// function to add new employee
const addEmployee = () => {
    // prompt for info about the employee
    inquirer
        .prompt([{
                name: 'fname',
                type: 'input',
                message: 'What is the employees first name?',
            },
            {
                name: 'lname',
                type: 'input',
                message: 'What is the employees last name?',
            },
        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                'INSERT INTO employee SET ?', {
                    first_name: answer.fname,
                    last_name: answer.lname
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your employee was created successfully!');
                    // re-prompt the user
                    start();
                }
            );
        });
};

const addRole = () => {
    // prompt for info about the employee
    inquirer
        .prompt([{
                name: 'title',
                type: 'input',
                message: 'What is the employees title?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the employees salary?',
            },
        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                'INSERT INTO role SET ?', {
                    title: answer.title,
                    salary: answer.salary
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your employee has been assigned a role!');
                    // re-prompt the user
                    start();
                }
            );
        });
};

const addDepartment = () => {
    // prompt for info about the employee
    inquirer
        .prompt([{
            name: 'department',
            type: 'input',
            message: 'What is the employees department?',
        }, ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                'INSERT INTO department SET ?', {
                    name: answer.name
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your employee has been assigned a department!');
                    // re-prompt the user
                    start();
                }
            );
        });
};

const afterConnection = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS "Department", role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;', (err, res) => {

        // SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary;
        // FROM employee
        // LEFT JOIN role
        // ON employee.role_id = role.id
        // LEFT JOIN department
        // ON department.id = role.department_id
        // ;
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

connection.connect((err) => {
    if (err) throw err;
    //console.log(`connected as id ${connection.id}`)
    console.log("connected!");
    afterConnection();
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
});