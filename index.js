const inquirer = require('inquirer');
const mysql = require('mysql');

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
            connection.query('INSERT INTO department SET ?', 
            {name: answers});
        })
        .catch(err => {
        if (err.isTtyError) {} else {} });
        connection.query('', (err, res) => {
        if (err) throw err;
        selectionMenu();  });};
   


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
            'choices': ["View ALL Employees Table", "Exit", "Add Department", "Add Role", "Add Employee", "Change Employee Role"], //"change employee managers", "view employees by manager", "delete department", "delete role", "delete employee", "View total department budget"
            'name': "menu"
        }, ])
        .then((answers) => {
            if (answers.menu === "View ALL Employees Table") {viewTbl()}
            if (answers.menu === "Exit") {connection.end()}
            if (answers.menu === "Add Department") {addDepartment()}
        })
        .catch(err => {
            if (err.isTtyError) {
                // something
            } else {
                // Something
            }
        });
}