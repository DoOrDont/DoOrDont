const connection = require('../index.js').connection;

const getGoalsForUser = (username, callback) => {
  connection.query('SELECT * FROM goals INNER JOIN users ON goals.user_id=(SELECT id FROM users WHERE username=' + username + ')', function (err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      console.log('DB results:', results);
      callback(null, results);
    }
  });
};