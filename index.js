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
                return;
            }
        })
};


// sql queries
function getDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        departmentList = results;
        mainMenu();
    }
    )
};

function getRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        mainMenu();
    }
    )
};

function getEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
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
            console.log(newDepartment);
            const { department } = newDepartment;
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
                for (let i = 0; i < departmentList.length; i++) {
                    if (departmentList[i].name === newRole.roleDepartment) {
                        departmentId = departmentList[i].id;
                    }
                }

                const { roleName, salary } = newRole;
                db.query('INSERT INTO role SET ?',
                    {
                        title: roleName,
                        salary: eval(salary),
                        department_id: departmentId
                    }, function (err, results) {
                        console.log(err)
                        console.table(results);
                        console.log("A new role was added to the database.");
                        mainMenu();
                    }
                )
            })
    })
};

function addEmployee() {
    db.query('SELECT id, title FROM role', function (err, results) {
        roleList = results.map((role) => {
            return { name: role.title, value: role.id };
        })

        db.query('SELECT id, first_name, last_name  FROM employee', function (err, results) {
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
                    console.log(newEmployee)
                    for (let i = 0; i < roleList.length; i++) {
                        if (roleList[i].value === newEmployee.employeeRole) {
                            // these are now value instead of id because when I mapped through I change the id property to value
                            roleId = roleList[i].value;

                        }
                    }
                    console.log(roleId);

                    for (let i = 0; i < employeeList.length; i++) {
                        if (employeeList[i].value === newEmployee.employeeManager) {
                            // these are now value instead of id because when I mapped through I change the id property to value
                            managerId = employeeList[i].value;
                        }
                    }
                    console.log(managerId);

                    const { firstName, lastName } = newEmployee;
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
    db.query('SELECT id, title FROM role', function (err, results) {
        roleList = results.map((role) => {
            return { name: role.title, value: role.id };
        })

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
                    console.log(updatedEmployee)
                    
                    for (let i = 0; i < employeeList.length; i++) {
                        if (employeeList[i].name === updatedEmployee.updateEmployee) {
                            // these are now value instead of id because when I mapped through I change the id property to value
                            updatedEmployeeId = employeeList[i].value;
                        }
                    }
                    console.log(updatedEmployeeId);

                    for (let i = 0; i < roleList.length; i++) {
                        if (roleList[i].name === updatedEmployee.newEmployeeRole) {
                            // these are now value instead of id because when I mapped through I change the id property to value
                            roleId = roleList[i].value;
                        }
                    }
                    console.log(roleId);

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