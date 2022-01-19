//const express = require('express');
//const PORT = process.env.PORT || 3001;
//const app = express();
const inquirer = require('inquirer');
const db = require('./db/connection');


// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

    const allDepts = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
    if (err) {
        throw err;
    }
        console.table(rows);
        start();
    });
    };

const allStaff = () => {
    const sql = `SELECT * FROM staff`;
    db.query(sql, (err, rows) => {
    if (err) {
        throw err;
    }
        console.table(rows);
        start();
    });
    };


const allPositions = () => {
    const sql = `SELECT * FROM position`;
    db.query(sql, (err, rows) => {
    if (err) {
        throw err;
    }
        console.table(rows);
        start();
    });
    };

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
            "Add new position",
            "Remove department",
            "Remove employee from staff",
            "Remove position"
            ]
        }
    ]).then((answer) => {
        // const { makeSelection } = selection;
        if (answer.makeSelection === "Display all departments") {
            allDepts();
        } else if (answer.makeSelection === "Display all staff") {
            allStaff();
        } else if (answer.makeSelection === "Display all positions") {
            allPositions();
        }
    })

}

start();