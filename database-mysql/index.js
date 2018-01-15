const mysql = require('mysql');

//const CLEARDB_DATABASE_URL = process.env.CLEARDB_DATABASE_URL;
const JAWSDB_URL = process.env.JAWSDB_URL;
const HEROKU_CONNECTION_CONFIG = JAWSDB_URL;

const LOCAL_CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'doordontdb'
};

const ENV_CONFIG = process.env.NODE_ENV === 'production' ? HEROKU_CONNECTION_CONFIG : LOCAL_CONNECTION_CONFIG;

const connection = mysql.createConnection(ENV_CONFIG);

module.exports.connection = connection;