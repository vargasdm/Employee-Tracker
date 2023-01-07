const mysql = require("mysql2");
const inquirer = require("inquirer");
const fs = require("fs");
const cTable = require("console.table");
const db = require("./config/connection.js");
// const { showDepartments, showRoles } = require("./config/query.js");


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
                // internPrompts();
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

// sql queries
function getDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
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
            db.query('INSERT INTO department (name) VALUES (?)', newDepartment, function (err, results) {
                console.table(results);
                mainMenu();
            }
            )
        }
        )
}