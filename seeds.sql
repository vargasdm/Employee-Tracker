INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sara", "Armstrong", 1, null),
       ("Heather", "Torres", 2, "Sara Armstrong"),
       ("Kathryn", "Murray", 3, null),
       ("Sandra", "Hughes", 4, "Kathryn Murray"),
       ("Christine", "Bass", 5, null),
       ("Eric", "Cox", 6, "Christine Bass"),
       ("Melissa", "Foster", 7, null),
       ("Bailey", "Odonnell", 8, "Melissa Foster");
       