const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');

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
    const departments = db.query('SELECT * FROM departments', function (err, results) {
        console.log(results);
    });
    console.table(departments);
}

showDepartments();

module.exports = showDepartments;