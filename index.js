const inquirer = require('inquirer');
const mysql = require('mysql');
require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'EmployeeTracker'
})

const viewTbl = () => {
    connection.query('SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;', (err, res) => {
        if (err) throw err;
        console.table(res);
        // connection.end();
        selectionMenu();
    });
};

const addDepartment = () => {
    inquirer
        .prompt([{
            'type': 'input',
            'message': 'What Department do you want to add?',
            'name': "addDepartment"
        }, ])
        .then((answers) => {
            connection.query(
                'INSERT INTO department (name) VALUES (?)',
                answers.addDepartment,
                (err) => {
                    if (err) throw err;
                    selectionMenu();
                });
        })
};

const viewDepartment = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        // connection.end();
        selectionMenu();
    });
};

const addRole = () => {
    inquirer
        .prompt([{
                'type': 'input',
                'message': 'What Role do you want to add?',
                'name': "addRole"
            },
            {
                'type': 'input',
                'message': 'What salary to you want to add to the role?',
                'name': "addSalary"
            },
            {
                'type': 'input',
                'message': 'What is the roles department id?',
                'name': "addRoleID"
            },
        ])
        .then((answers) => {
            console.log(answers);
            connection.query(
                'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
                [answers.addRole, answers.addSalary, answers.addRoleID],
                (err) => {
                    if (err) throw err;
                    selectionMenu();
                });
        })
};

const viewRole = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        // connection.end();
        selectionMenu();
    });
};

const updateRole = () => {
    // query the database for all employees
    connection.query('SELECT * FROM employee', (err, employees) => {
        if (err) throw err;
        connection.query('SELECT * FROM role', (err, roles) => {
            if (err) throw err;
            // *********** CHOOSING EMPLOYEE **************
            // once you have the items, prompt the user for which they'd like to bid on
            inquirer
                .prompt([{
                    name: 'choice',
                    type: 'list',
                    choices: () => employees.map((item) => {
                        return {
                            name: item.first_name,
                            value: item.id
                        }
                    }),
                    message: 'Which employees role would you like to update?',
                }, {
                    name: "newRole",
                    type: "list",
                    choices: () => roles.map((item) => {
                        return {
                            name: item.title,
                            value: item.id
                        }
                    }),
                    message: 'What role should they have?'
                }])
                .then((answer) => {
                    // get the information of the chosen item
                    // *********** CHOOSING ROLE **************
                    connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.newRole, answer.choice], function (error, results, fields) {
                        if (error) throw error;
                        selectionMenu();
                    })
                    // get the information of the chosen item

                });

        });
    })
};

// const addEmployee = () => {
//     inquirer
//         .prompt([{
//                 'type': 'input',
//                 'message': 'What is the Employees first name?',
//                 'name': "first_name"
//             },
//             {
//                 'type': 'input',
//                 'message': 'What is the Employees last name?',
//                 'name': "last_name"
//             },
//             {
//                 'type': 'input',
//                 'message': 'What is the employees role?',
//                 'name': "role_id"
//             },
//             {
//                 'type': 'input',
//                 'message': 'What is the id of the employees manager?',
//                 'name': "manager_id"
//             },

//         ])
//         .then((answers) => {
//             console.log(answers);
//             connection.query(
//                 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
//                 [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
//                 (err) => {
//                     if (err) throw err;
//                     selectionMenu();
//                 });
//         })
// };

const addEmployee = () => {
        connection.query('SELECT * FROM employee', (err, employees) => {
                if (err) throw err;
                connection.query('SELECT * FROM role', (err, roles) => {
                        if (err) throw err;
                        inquirer
                            .prompt([{
                                    type: 'input',
                                    message: 'What is the Employee\'s first name?',
                                    name: "first_name"
                                },
                                {
                                    type: 'input',
                                    message: 'What is the Employee\'s last name?',
                                    name: "last_name"
                                },
                                {
                                    type: 'list',
                                    message: 'Choose the employee\'s role',
                                    name: "role_text",
                                    choices: () => roles.map((item) => {
                                        return {
                                            name: item.title,
                                            value: item.id
                                        }
                                    }),
                                },
                                {
                                    type: 'list',
                                    message: 'Choose the employee\'s manager',
                                    name: "manager",
                                    choices: () => employees.map((item) => {
                                        return {
                                            name: item.first_name,
                                            value: item.id
                                        }
                                    }),
                                }

                            ])
                            .then((answers) => {
                                console.log(answers);
                                connection.query(
                                    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                                    [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
                                    (err) => {
                                        if (err) throw err;
                                        selectionMenu();
                                    });
                            });
                    }
                )}
            );
        };

        const viewEmployee = () => {
            connection.query('SELECT * FROM employee', (err, res) => {
                if (err) throw err;
                console.table(res);
                // connection.end();
                selectionMenu();
            });
        };

        connection.connect((err) => {
            if (err) throw err;
            //console.log(`connected as id ${connection.id}`)
            console.log("connected!");
            selectionMenu();
            // error will be an Error if one occurred during the query
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
        });

        const selectionMenu = () => {
            inquirer
                .prompt([{
                    'type': 'list',
                    'message': 'What do you want to do ?',
                    'choices': ["View ALL Employees Table", "Exit", "Add Department", "View Department", "Add Role", "View Role", "Update Role", "View Employee", "Add Employee", "Change Employee Role"], //"change employee managers", "view employees by manager", "delete department", "delete role", "delete employee", "View total department budget"
                    'name': "menu"
                }, ])
                .then((answers) => {
                    if (answers.menu === "View ALL Employees Table") {
                        viewTbl()
                    }
                    if (answers.menu === "Exit") {
                        connection.end()
                    }
                    if (answers.menu === "Add Department") {
                        addDepartment()
                    }
                    if (answers.menu === "View Department") {
                        viewDepartment()
                    }
                    if (answers.menu === "Add Role") {
                        addRole()
                    }
                    if (answers.menu === "Update Role") {
                        updateRole()
                    }
                    if (answers.menu === "View Role") {
                        viewRole()
                    }
                    if (answers.menu === "Add Employee") {
                        addEmployee()
                    }
                    if (answers.menu === "View Employee") {
                        viewEmployee()
                    }
                    if (answers.menu === "Change Employee Role") {
                        changeRole()
                    }
                })
                .catch(err => {
                    if (err.isTtyError) {
                        // something
                    } else {
                        // Something
                    }
                });
        }