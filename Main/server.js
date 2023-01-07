const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table')

// Connect to database probably need to use this for functions that edit certain dadabases
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '!Lunch#9361258!',
      database: 'books_db'
    },
    console.log(`Connected to the books_db database.`)
  );