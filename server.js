//const express = require('express');
//const PORT = process.env.PORT || 3001;
//const app = express();
const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');


// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const start = () => {
    return inquirer.prompt ([
        {
            type: "list",
            name: "makeSelection",
            message: "Please make a seletion from the list below",
    choices: [
            "Display all departments",
            "Display all staff",
            "Display all occupations",
            "Add department",
            "Add employee to staff",
            "Add new occupation"
            ]
        }
    ]).then((answer) => {
        if (answer.makeSelection === "Display all departments") {
            allDepts();
        } else if (answer.makeSelection === "Display all staff") {
            allStaff();
        } else if (answer.makeSelection === "Display all occupations") {
            allOccupations();
        } else if (answer.makeSelection === "Add department") {
            addDept();
        } else if (answer.makeSelection === "Add employee to staff") {
            addStaff();
        } else if (answer.makeSelection === "Add new occupation") {
            addOccupation();
        }
    })

}

    allDepts = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
    if (err) {
        throw err;
    }
        console.table(rows);
        start();
    });
    };

    allStaff = () => {
    const sql = `SELECT * FROM staff`;
    db.query(sql, (err, rows) => {
    if (err) {
        throw err;
    }
        console.table(rows);
        start();
    });
    };


    allOccupations = () => {
    const sql = `SELECT * FROM occupation`;
    db.query(sql, (err, rows) => {
    if (err) {
        throw err;
    }
        console.table(rows);
        start();
    });
    };

    addDept = () => {
     return inquirer.prompt ([
            {
            type: "input",
            name: "deptName",
            message: "Please enter new department's name"
            }
        ]).then((answer) => {
            const sql = `INSERT INTO department (name)
            VALUES (?)`;
         const params = [answer.deptName];

         db.query(sql, params, (err, result) => {
            if (err) {
              throw err;
            }
            allDepts();
              //start();

        })
    })
}

addOccupation = () => {
    return inquirer.prompt ([
           {
           type: "input",
           name: "title",
           message: "Please enter new occupation's title"
           },
           {
            type: "input",
            name: "departmentId",
            message: "Please enter the department id for the new occupation"
            },
            {
            type: "input",
            name: "salary",
            message: "Please enter new occupation's salary"
                },

            ]).then((answer) => {

                const sql = `INSERT INTO occupation (title, dept_id, salary)
                   VALUES (?,?,?)`;
                const params = [answer.title, answer.departmentId, answer.salary];
              
                db.query(sql, params, (err, result) => {
                  if (err) {
                    throw err;
                  }
                  allOccupations();
             //start();

       })
   })
}

const addStaff = () => {
    return inquirer.prompt ([
        {
            type: "input",
            name: "firstName",
            message: "Please enter employee's first name"
        },

        {
            type: "input",
            name: "lastName",
            message: "Please enter employee's last name"
        },
        {
            type: "input",
            name: "department",
            message: "Please enter employee's department"
        },
        {
            type: "input",
            name: "roleId",
            message: "Please enter employee's role id"
        },
        {
            type: "input",
            name: "managerId",
            message: "Please enter employee's manager's id"
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter employee's salary"
        },

        
    ]).then((answer) => {

    const sql = `INSERT INTO staff (first_name, last_name, department, role_id, manager_id, salary)
       VALUES (?,?,?,?,?,?)`;
    const params = [answer.firstName, answer.lastName, answer.department, answer.roleId, answer.managerId, answer.salary];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        throw err;
      }
      allStaff();
        //start();
    });
    });

   
}


start();