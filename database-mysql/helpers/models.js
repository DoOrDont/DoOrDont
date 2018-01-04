const connection = require('../index.js').connection;
const bcrypt = require('bcrypt-nodejs');

/***********************************************
 Function:
   Retrieves array of goals for given user.

 Inputs: 
   username (String), callback (Function)

 Output:
   None
   NOTE: All data must be handled in the callback function.
         the results variable will be an Array of goal objects:
         [goalObj1, goalObj2, etc...]
         Each goal object will have the shape:
         {
           id: Number,
           description: String,
           punishment: String,
           frequency: Number,
           user_id: 1
         }
***********************************************/
module.exports.getGoalsForUser = (username, callback) => {
  connection.query(`SELECT DISTINCT goals.* FROM users INNER JOIN goals ON 
                   (SELECT id FROM users WHERE username=?)=goals.user_id;`, [username], function (err, results) {
    if (err) throw err;

    console.log('DB results:', results);
    callback(results);
  });
};

/************************************************
 Function:
   Inserts a goal into the database

 Inputs:
   goalsObj: Object with shape:
             {
               'description': String,
               'punishment': String,
               'frequency': Number,
               'username': String
             }

 Output:
   None.
   Note: Data must be handled in the callback
         If insertion is successful, results variable will be
         an object with metadata pertaining to the insertion
************************************************/
module.exports.insertGoalsIntoDB = (goalsObj, callback) => {
  const {description, punishment, frequency, username} = goalsObj;

  connection.query(`INSERT INTO goals (description, punishment, frequency, user_id) 
                    VALUES (?, ?, ?, (SELECT id FROM users WHERE username=?))`,
                    [description, punishment, frequency, username],
                    (err, results) => {
                      if (err) throw err;

                      console.log('DB results:', results);
                      callback(results);
                    });
};

/************************************************
 Function:
   Inserts user info into database

 Inputs:
   userObj: Object with shape:
            {
              username: String,
              password: String
            } 

 Output:
   None.
   Note: Data must be handled in the callback
         If insertion is successful, results variable will be
         an object with metadata pertaining to the insertion
************************************************/
module.exports.insertUserIntoDB = (userObj, callback) => {
  const {username, password} = userObj;
  bcrypt.hash(password, null, null, (err, hash) => {
    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err, results) => {
      if(err) console.log(err);
      
      console.log('Inserted user:', results);
      callback(results);
    });
  });
};

/************************************************
 Function:
   Retrieves user from database

 Inputs:
   userObj: Object with shape:
            {
              username: String,
              password: String
            }
          
  Output:
   None
   NOTE: All data must be handled in the callback function.
         The callback will be passed true if password matches,
         false if otherwise.
************************************************/
module.exports.getAndVerifyUser = (userObj, callback) => {
  const {username, password} = userObj;
  connection.query('SELECT * FROM users WHERE username=?', [username], (err, results) => {
    if(err) throw err;
    
    bcrypt.compare(password, results.password, (res) => {
      if(res) {
        console.log('Password is a match!');
        callback(true);
      } else {
        console.log('Password is NOT a match!');
        callback(false);
      }
    });
  });
};


// TESTS for inserting and retrieving user
// let testGoal = {
//   'description': 'testing testing',
//   'punishment': 'bad bad',
//   'frequency': 6,
//   'username': 'jason'
// };

// let testUser = {
//   'username': 'Jon Doe',
//   'password': 'superawesomepassword'
// };

// exports.insertUserIntoDB(testUser, () => {
//   exports.getAndVerifyUser(testUser, () => console.log('DONE putting and retrieving user'));
// });