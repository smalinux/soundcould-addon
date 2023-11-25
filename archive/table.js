import sqlite from 'sqlite3';

const db = new sqlite.Database('./quote.db', sqlite.OPEN_READWRITE, (err) => {
   if (err) return console.error(err);
})


//const sql = `CREATE TABLE quote(ID INTEGER PRIMARY KEY, movie, quote, charater)`;
const sql = `CREATE TABLE quote(username)`;
db.run(sql);




// Ref
//    https://www.youtube.com/watch?v=mnH_1YGR2PM&ab_channel=ByteMyke
