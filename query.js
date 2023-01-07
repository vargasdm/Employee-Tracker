const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
// const index = require('./index.js');
// const { mainMenu } = require('./index.js');

// Connect to database probably need to use this for functions that edit certain dadabases
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '!Lunch#9361258!',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

function showDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
    });
    return;
}

function showRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
    });
}

module.exports = { showDepartments, showRoles };