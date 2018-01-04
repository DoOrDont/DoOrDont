const connection = require('../index.js').connection;

/***********************************************
 Function:
   Retrieves array of goals for given user.

 Inputs: 
   username (String), callback (Function)

 Output:
   None
   NOTE: All data must be handled in the callback function.
         the results variable will be an Object with the shape:
         {
           id: Number,
           description: String,
           punishment: String,
           frequency: Number,
           user_id: 1
         }
***********************************************/
const getGoalsForUser = (username, callback) => {
  connection.query(`SELECT DISTINCT goals.* FROM users INNER JOIN goals ON 
                   (SELECT id FROM users WHERE username=?)=goals.user_id;`, [username], function (err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      console.log('DB results:', results);
      callback(null, results);
    }
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
const insertGoalsIntoDB = (goalsObj, callback) => {
  connection.query(`INSERT INTO goals (description, punishment, frequency, user_id) 
                    VALUES (?, ?, ?, (SELECT id FROM users WHERE username=?))`,
                    [goalsObj.description, goalsObj.punishment, goalsObj.frequency, goalsObj.username],
                    (err, results) => {
                      if (err) {
                        console.log(err);
                        callback(err, null);
                      } else {
                        console.log('DB results:', results);
                        callback(null, results);
                      }
                    });
}

let testObj = {
  'description': 'testing testing',
  'punishment': 'bad bad',
  'frequency': 6,
  'username': 'jon'
};

insertGoalsIntoDB(testObj, ()=>{});