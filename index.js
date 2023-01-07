const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
const query = require('./query.js');
const { showDepartments, showRoles } = require('./query.js');


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
                showDepartments();
            } else if (answers.options === 'View all roles') {
                showRoles();
            } else if (answers.options === 'View all employees') {
                // internPrompts();
            } else if (answers.options === 'Add a department') {
                // internPrompts();
            } else if (answers.options === 'Add a role') {
                // internPrompts();
            } else if (answers.options === 'Add an employee') {
                // internPrompts();
            } else if (answers.options === 'Update and employee role') {
                // internPrompts();
            } else {
                return
            }
        })
};

mainMenu();

// module.exports = { mainMenu };