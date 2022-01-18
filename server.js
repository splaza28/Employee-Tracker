const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


  app.get('/api/staff', (req, res) => {
    const sql = `SELECT * FROM staff`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
  

  app.get('/api/staff/:id', (req, res) => {
    const sql = `SELECT * FROM staff WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

// db.query(`SELECT * FROM staff WHERE id = 1`, (err, rows) => {
//     if (err) {
//         console.log(err);
//       }
//     console.log(rows);
//   });

//   const sql = `INSERT INTO staff (id, first_name, last_name, role_id, manage_id) 
//               VALUES (?,?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1, 2];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//   db.query(`DELETE FROM staff WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

// app.delete('/api/staff/:id', (req, res) => {
//     const sql = `DELETE FROM staff WHERE id = ?`;
//     const params = [req.params.id];
  
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.statusMessage(400).json({ error: res.message });
//       } else if (!result.affectedRows) {
//         res.json({
//           message: 'Employee not found'
//         });
//       } else {
//         res.json({
//           message: 'deleted',
//           changes: result.affectedRows,
//           id: req.params.id
//         });
//       }
//     });
//   });

app.post('/api/staff', ({ body }, res) => {
    // const errors = inputCheck(
    //   body,
    //   'first_name',
    //   'last_name',
    //   'industry_connected'
    // );
    // if (errors) {
    //   res.status(400).json({ error: errors });
    //   return;
    // }
  
    const sql = `INSERT INTO staff (first_name, last_name, role_id, manage_id)
      VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manage_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });
  

  app.use((req, res) => {
    res.status(404).end();
  });


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
