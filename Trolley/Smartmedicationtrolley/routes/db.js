const { Database } = require('sqlite3')

var sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('smarttrolley.db');
// var data = ['test','1234']
// db.all(`SELECT * FROM account WHERE username = ? AND password =?`,data,(err,result)=>{
//   console.log(result.length)
// });

module.exports = db;