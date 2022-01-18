const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,

      user: 'root',
      // Your MySQL password
      password: 'Boymom1921!!',
      //update database name when created
      database: 'directory'
    },
    console.log('Connected to the directory database.')
  );







  module.exports = db;