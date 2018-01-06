const mysql = require('mysql');

const DB_PATH = process.env.DB_PATH || 'localhost';
const PASS = process.env.PASS || 'password';

const connection = mysql.createConnection({
  host: DB_PATH,
  user: 'root',
  password: '',
  database: 'doordontdb'
});

module.exports.connection = connection;
