const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
require("console.table");
const query = require('./query.js');
const { showDepartments } = require('./query.js');

// test to see if console.table works
console.table([
    {
      name: 'foo',
      age: 10
    }, {

      name: 'bar',
      age: 20
    }
  ]);


console.log('Welcome to your Employee Manager!!')

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
                // internPrompts();
            } else if (answers.options === 'View all employees') {
                // internPrompts();
            }else if (answers.options === 'Add a department') {
                // internPrompts();
            }else if (answers.options === 'Add a role') {
                // internPrompts();
            }else if (answers.options === 'Add an employee') {
                // internPrompts();
            }else if (answers.options === 'Update and employee role') {
                // internPrompts();
            }else {
                return
            }
        })