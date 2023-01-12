# Employee Tracker

## Description

The motivation for this project was to assist business owners track and organize their current employees. This will allow business owner to view and manage their departments, roles, and employees of the business.

During this project I learned: 
- how to install and implement dotenv to hide my sql log in credentials
- how to install and implement mysql2 to access sql databases
- how to use sql to create databases, tables, and columns within a database
- how to use sql queries to retreive, add, update data in a sql database
- how to install and implement inquirer to interact with the user in the terminal
- how to install and implement console.table to display sql tables in the terminal

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

First, you will need to clone this repository to your local machine. The repository should already contain the package.json file as well as the package-lock.json file. This application requires you to have node.js version 16.18 and you can read how to install the correct version at https://coding-boot-camp.github.io/full-stack/nodejs/how-to-install-nodejs. This application also requires the thrid-party packages inquirer, console.table, mysql2, and dotenv. It can be installed by opening the index.js terminal and entering npm i. You will be able to check the package.jason file and find the dependencies. After the required packages are installed, the user can open the terminal in the index.js file, and enter node index.js.

To install the packages check these resources:
- https://www.npmjs.com/package/inquirer
- https://www.npmjs.com/package/mysql2
- https://www.npmjs.com/package/console.table
- https://www.npmjs.com/package/dotenv

## Usage

This application can be used to view and manage a database with employee information. When the application is started the user will be presented with a menu with several options. When the user chooses 'View all departments', a table is displayed in the terminal with the department information. When the user chooses 'View all roles', a table is displayed in the terminal with the role information. When the user chooses 'View all employees', a table is displayed in the terminal with the employee information. When the user chooses 'Add a department', the user is prompted for the name of the department and it is added to the employee database. When the user chooses 'Add a role', the user is prompted for the name of the role, the salary of the role, and the department that the role belongs to and it is added to the employee database. When the user chooses 'Add a employee', the user is prompted for the first and last name of the employee, the role the employee holds, and who manages that employee and it is added to the employee database. When the user chooses 'Update an employee role', the user is prompted for the name of the employee whose role the user wants to update and the employee's new role and it is updated in the employee database.

The demo video can be viewed here: https://drive.google.com/file/d/1iE0jhoPZU0vg5mVgJoimp_PhA14_9iW1/view.

## Credits

I followed these links and tutorials in the completion of this project:

- https://www.w3schools.com/sql/sql_update.asp
- https://www.mysqltutorial.org/mysql-nodejs/update/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
- https://www.w3schools.com/sql/sql_constraints.asp
- https://dmitripavlutin.com/javascript-object-destructuring/
- https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
- https://www.geeksforgeeks.org/sql-query-to-insert-multiple-rows/
- https://www.w3schools.com/sql/sql_ref_foreign_key.asp
- https://www.w3schools.com/sql/sql_create_table.asp

## License

No licenses were used during this project.
