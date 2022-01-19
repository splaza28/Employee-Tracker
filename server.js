//const express = require('express');
//const PORT = process.env.PORT || 3001;
//const app = express();
const inquirer = require('inquirer');
const db = require('./db/connection');


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
            "Display all positions",
            "Add department",
            "Add employee to staff",
            "Add new position"
            ]
        }
    ]).then((answer) => {
        if (answer.makeSelection === "Display all departments") {
            allDepts();
        } else if (answer.makeSelection === "Display all staff") {
            allStaff();
        } else if (answer.makeSelection === "Display all positions") {
            allPositions();
        } else if (answer.makeSelection === "Add department") {
            addDept();
        } else if (answer.makeSelection === "Add employee to staff") {
            addStaff();
        } else if (answer.makeSelection === "Add new position") {
            addPosition();
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


    allPositions = () => {
    const sql = `SELECT * FROM position`;
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

addPosition = () => {
    return inquirer.prompt ([
           {
           type: "input",
           name: "title",
           message: "Please enter new position's title"
           },
           {
            type: "input",
            name: "departmentId",
            message: "Please enter the department id for the new position"
            },
            {
            type: "input",
            name: "salary",
            message: "Please enter new position's salary"
                },

       ]).then((answer) => {
           const sql = `INSERT INTO position (title, dept_id, salary)
           VALUES (?,?,?)`;
        const params = [answer.title, answer.departmentId, answer.salary];

        db.query(sql, params, (err, result) => {
           if (err) {
             throw err;
           }
           allPositions();
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
            message: "Please enter employee's late name"
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

        
    ]).then((answer) => {

    const sql = `INSERT INTO staff (first_name, last_name, role_id, manager_id)
       VALUES (?,?,?,?)`;
    const params = [answer.firstName, answer.lastName, answer.roleId, answer.managerId];
  
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