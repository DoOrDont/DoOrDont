const connection = require('../index.js').connection;

const getGoalsForUser = (username, callback) => {
  connection.query('SELECT * FROM items', function (err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};