
//  RUN:
//    $ node table.js
//
//
//
//

import express from "express";
import bodyParser from "body-parser";
import sqlite from 'sqlite3';
import url from "url";


const db = new sqlite.Database('./quote.db', sqlite.OPEN_READWRITE, (err) => {
   if (err) return console.error(err);
})

const app = express();
const PORT = 5000;

let sql;


app.use(bodyParser.json());

// post request
app.post("/quote", (req, res) => {
   try {
      //console.log(req.body.username);
      const { username } = req.body;
      sql = "INSERT INTO quote(username) VALUES (?)"
      db.run(sql, [username], (err)=>{
         if (err)
            return res.json({status: 300, sucess: false, error: err});

         console.log('successful input ', username);
      });

      return res.json({
         status: 200,
         sucess: true,
      });

   } catch (error) {

      return res.json({
         status: 400,
         sucess: false,

      });
   }
})


app.get("/quote", (req, res) => {
   sql = "SELECT * FROM quote";
   try {
      // Query Params
      const queryObject = url.parse(req.url, true).query;
      console.log(queryObject);
      //if (queryObject.username && queryObject.type)
      if (queryObject.username)
         //sql += ` WHERE ${queryObject.username} LIKE '%${queryObject.type}%'`;
         sql += ` WHERE username='${queryObject.username}'`;

      console.log(sql);
      db.all(sql, [], (err, rows) => {
         if (err)
            return res.json({ status: 300, sucess: false, error: err });

         if(rows.length < 1)
            return res.json({ status: 300, sucess: false, error: "No Match!" });

         return res.json({ status: 200, data: rows, success: true });

      });
   } catch (error) {

      return res.json({
         status: 400,
         sucess: false,

      });
   }
});


app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
