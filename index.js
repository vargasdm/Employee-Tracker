const mysql = require("mysql2");
const inquirer = require("inquirer");
const fs = require("fs");
const cTable = require("console.table");
const db = require("./config/connection.js");


console.log('Welcome to your Employee Manager!!')

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
                    'Update and employee role',
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
                // internPrompts();
            } else if (answers.options === 'Update and employee role') {
                // internPrompts();
            } else {
                return;
            }
        })
};

mainMenu();

// function determineDepartmentId() {
//     let departmentList = [];
//     db.query('SELECT * FROM department', function (err, results) {
//         departmentList = results;
//         let departmentId;
//                 for (let i = 0; i < departmentList.length; i++) {
//                     if (departmentList[i].name === newRole.roleDepartment) {
//                         departmentId = departmentList[i].id;
//                         console.log(departmentId);
//                     }
//                 }
//     })
// }

// sql queries
function getDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        departmentList = results;
        mainMenu();
    }
    )
}

function getRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        mainMenu();
    }
    )
}

function getEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        mainMenu();
    }
    )
}

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
                mainMenu();
            }
            )
        }
        )
}

function addRole() {
    let departmentList = [];
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
                let departmentId;
                for (let i = 0; i < departmentList.length; i++) {
                    for (let i = 0; i < departmentList.length; i++) {
                        if (departmentList[i].name === newRole.roleDepartment) {
                            departmentId = departmentList[i].id;
                        }
                    }

                    const { roleName, salary } = newRole;
                    db.query('INSERT INTO role SET ?',
                     { title: roleName, 
                        salary: eval(salary), 
                        department_id: departmentId 
                    }, function (err, results) {
                        console.log(err)
                        console.table(results);
                        mainMenu();
                    }
                    )
                }
            })
    })

}

// function addEmployee() {
//     inquirer
//         .prompt([
//             {
//                 type: 'input',
//                 message: 'What is the name of the department?',
//                 name: 'department',
//             }
//         ])
//         .then((answers) => {
//             let newDepartment = answers;
//             console.log(newDepartment);
//             const { department } = newDepartment;
//             db.query('INSERT INTO department (name) VALUES (?)', department, function (err, results) {
//                 console.table(results);
//                 mainMenu();
//             }
//             )
//         }
//         )
// }