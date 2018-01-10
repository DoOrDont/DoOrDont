const mysql = require('mysql');

const CLEARDB_DATABASE_URL = process.env.CLEARDB_DATABASE_URL || 'localhost';
const DB_PASS = process.env.DB_PASS || '';
const DB_USER = process.env.DB_USER || 'root';
const DB_NAME = process.env.DB_NAME || 'doordontdb';


const connection = mysql.createConnection({
  host: CLEARDB_DATABASE_URL,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
});

module.exports.connection = connection;
