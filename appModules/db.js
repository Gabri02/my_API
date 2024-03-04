const mysql = require("mysql");
const util = require("util");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "meditactive",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database");
});

const query = util.promisify(db.query).bind(db);

module.exports = query;
