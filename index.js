const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./config/connection.js");
let departmentId;
let roleId;
let managerId;
let updatedEmployeeId;
let departmentList = [];
let roleList = [];
let employeeList = [];

console.log('Welcome to your Employee Manager!!');

function mainMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'options',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Quit'],
            }
        ])
        .then((answers) => {
            if (answers.options === 'View all departments') {
                getDepartments();
            } else if (answers.options === 'View all roles') {
                getRoles();
            } else if (answers.options === 'View all employees') {
                getEmployees();
            } else if (answers.options === 'Add a department') {
                addDepartment();
            } else if (answers.options === 'Add a role') {
                addRole();
            } else if (answers.options === 'Add an employee') {
                addEmployee();
            } else if (answers.options === 'Update an employee role') {
                updateRole();
            } else {
                process.exit();
            }
        })
};

function getDepartments() {
    // retreives info from department table in employee db
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        departmentList = results;
        mainMenu();
    }
    )
};

function getRoles() {
    // retreives info from department and role table in employee db, joins and displays it
    db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id ', function (err, results) {
        console.table(results);
        mainMenu();
    }
    )
};

function getEmployees() {
    // retreives info from department, role and employee table from employee db, joins and displays it
    db.query('SELECT e1.id, e1.first_name, e1.last_name, role.title, role.salary, department.name AS department, CONCAT(e2.first_name, " ", e2.last_name) AS manager FROM employee e1 JOIN role ON e1.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee e2 ON e1.manager_id = e2.id', function (err, results) {
        console.table(results);
        mainMenu();
    }
    )
};

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'department',
            }
        ])
        .then((answers) => {
            let newDepartment = answers;
            const { department } = newDepartment;
            // adds a row in department table with user input
            db.query('INSERT INTO department (name) VALUES (?)', department, function (err, results) {
                console.table(results);
                console.log("A new department was added to the database.");
                mainMenu();
            }
            )
        }
        )
};

function addRole() {
    db.query('SELECT * FROM department', function (err, results) {
        departmentList = results;

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the name of the role?',
                    name: 'roleName',
                },
                {
                    type: 'input',
                    message: 'What is the salary of this role?',
                    name: 'salary',
                },
                {
                    type: 'list',
                    message: 'What department does this role belong to?',
                    name: 'roleDepartment',
                    choices: departmentList,
                }
            ])
            .then((answers) => {
                let newRole = answers;
                // loop to match primary key from department table and foreign key from role table
                for (let i = 0; i < departmentList.length; i++) {
                    if (departmentList[i].name === newRole.roleDepartment) {
                        departmentId = departmentList[i].id;
                    }
                }

                const { roleName, salary } = newRole;
                // adds a row in role table with user input
                db.query('INSERT INTO role SET ?',
                    {
                        title: roleName,
                        salary: eval(salary),
                        department_id: departmentId
                    }, function (err, results) {
                        console.log(err);
                        console.table(results);
                        console.log("A new role was added to the database.");
                        mainMenu();
                    }
                )
            })
    })
};

function addEmployee() {
    // retreives title info from role table
    db.query('SELECT id, title FROM role', function (err, results) {
        // maps property names from user input so it can be used in inquirer prompt
        roleList = results.map((role) => {
            return { name: role.title, value: role.id };
        })

        // retreives first and last name from employee table
        db.query('SELECT id, first_name, last_name FROM employee', function (err, results) {
            // maps property names from user input so it can be used in inquirer prompt
            employeeList = results.map((employee) => {
                return { name: employee.first_name + " " + employee.last_name, value: employee.id };
            })
            employeeList.push({ name: 'NONE', value: null });

            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What is the first name of this employee?',
                        name: 'firstName',
                    },
                    {
                        type: 'input',
                        message: 'What is the last name of this employee?',
                        name: 'lastName',
                    },
                    {
                        type: 'list',
                        message: 'What role does this employee hold?',
                        name: 'employeeRole',
                        choices: roleList,
                    },
                    {
                        type: 'list',
                        message: 'Who manages this employee?',
                        name: 'employeeManager',
                        choices: employeeList
                    }
                ])
                .then((answers) => {
                    let newEmployee = answers;
                    // loop to match primary key from role table and foreign key from employee table
                    for (let i = 0; i < roleList.length; i++) {
                        if (roleList[i].value === newEmployee.employeeRole) {
                            roleId = roleList[i].value;
                        }
                    }
                    // loop to match primary key from employee table and foreign key from employee table
                    for (let i = 0; i < employeeList.length; i++) {
                        if (employeeList[i].value === newEmployee.employeeManager) {
                            managerId = employeeList[i].value;
                        }
                    }

                    const { firstName, lastName } = newEmployee;
                    // adds info into employee table
                    db.query('INSERT INTO employee SET ?',
                        {
                            first_name: firstName,
                            last_name: lastName,
                            role_id: roleId,
                            manager_id: managerId
                        }, function (err, results) {
                            console.log(err)
                            console.table(results);
                            console.log("A new employee was added to the database.");
                            mainMenu();
                        }
                    )
                })
        })
    })
};

function updateRole() {
    // retreives title info from role table
    db.query('SELECT id, title FROM role', function (err, results) {
        roleList = results.map((role) => {
            return { name: role.title, value: role.id };
        })

        // retreives first and last name from employee table
        db.query('SELECT id, first_name, last_name FROM employee', function (err, results) {
            employeeList = results.map((employee) => {
                return { name: employee.first_name + " " + employee.last_name, value: employee.id };
            })

            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: 'Select and employee to update',
                        name: 'updateEmployee',
                        choices: employeeList
                    },
                    {
                        type: 'list',
                        message: `Select the employee's new role`,
                        name: 'newEmployeeRole',
                        choices: roleList,
                    }
                ])
                .then((answers) => {
                    let updatedEmployee = answers;

                    // loop to match primary key from employee table and foreign key from employee table
                    for (let i = 0; i < employeeList.length; i++) {
                        if (employeeList[i].value === updatedEmployee.updateEmployee) {
                            updatedEmployeeId = employeeList[i].value;
                        }
                    }
                    
                    // loop to match primary key from role table and foreign key from employee table
                    for (let i = 0; i < roleList.length; i++) {
                        if (roleList[i].value === updatedEmployee.newEmployeeRole) {
                            roleId = roleList[i].value;
                        }
                    }

                    // updates employee role id with user input
                    db.query('UPDATE employee SET role_id = ? WHERE id = ?',
                        [
                            roleId,
                            updatedEmployeeId
                        ], function (err, results) {
                            console.log(err)
                            console.table(results);
                            console.log(`An employee's role has been updated in the database.`);
                            mainMenu();
                        }
                    )
                })
        })
    })
}

mainMenu();