const { Database } = require('sqlite3')

var sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('smarttrolley.db');
module.exports = db;