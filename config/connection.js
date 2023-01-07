
const mysql = require('mysql2');
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

module.exports = db;