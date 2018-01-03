const connection = require('../index.js').connection;

const getGoalsForUser = (username, callback) => {
<<<<<<< HEAD
  connection.query('SELECT * FROM goals INNER JOIN users ON goals.user_id=(SELECT id FROM users WHERE username=' + username + ')', function (err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      console.log('DB results:', results);
=======
  connection.query('SELECT * FROM items', function (err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
>>>>>>> 696ee0a722f18155e79402a76e90d0f38a6919fc
      callback(null, results);
    }
  });
};