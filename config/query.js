const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
const db = require('./connection.js');
//import mainMenu from './index.js';



// const index = require('./index.js');
// const { mainMenu } = require('./index.js');

// Connect to database probably need to use this for functions that edit certain dadabases

function showDepartments() {
    return db.query('SELECT * FROM department', function (err, results) {
        console.table(results); 
      
    });
 
}

function showRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
    });
}

module.exports = { showDepartments, showRoles };