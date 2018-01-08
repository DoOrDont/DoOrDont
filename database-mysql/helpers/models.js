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
           initiate: Boolean,
           frequency: Number,
           counter: Number,
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
   Inserts a goalsObj into the database

 Inputs:
   goalsObj: Object with shape:
             {
               'description': String,
               'punishment': String,
               'initiate': Boolean,
               'frequency': Number,
               'username': String
             }
      Note: The 'initiate' Boolean indicates whether the user wants to start or quit an activity
            (e.g. 'I want to start going to the gym 4 days a week' <'initiate' = true>   
                   VS
                  'I want to quit smoking' <'initiate' = false>)

 Output:
   None.
   Note: Data must be handled in the callback
         If insertion is successful, results variable will be
         an object with metadata pertaining to the insertion
************************************************/
module.exports.insertGoalsIntoDB = (goalsObj, callback) => {
  const {description, punishment, initiate, frequency, username} = goalsObj;
  let initiating = initiate ? 1 : 0;

  console.log('Inserting goal:', goalsObj);

  connection.query(`INSERT INTO goals (description, punishment, initiate, frequency, counter, user_id) 
                    VALUES (?, ?, ?, ?, 0, (SELECT id FROM users WHERE username=?))`,
                    [description, punishment, initiating, frequency, username],
                    (err, results) => {
                      if (err) return console.log(err);

                      console.log('DB results:', results);
                      callback(results);
                    });
};

/************************************************
 Function:
   Increments counter on goal

 Inputs:
   goalId Number representing the id of desired goal

 Output:
   None.
   The server will create a results object with metadata
   about the update, that object will be fed to the callback
************************************************/
module.exports.incrementGoalCounter = (goalId, callback) => {
  connection.query('UPDATE goals SET counter=counter+1 WHERE id=?', [goalId], (err, results) => {
    if(err) throw err;
    
    callback(results);
  });
};

/************************************************
 Function:
   Checks if user has achieve their goal this week

 Inputs:
   goalId Number representing the id of desired goal

 Output:
   None.
   The callback will be given an Object with the shape:
   {
     metGoal: Boolean,
     frequency: Number,
     counter: Number,
     initiate: Boolean
   }
************************************************/
module.exports.checkGoalCompletion = (goalId, callback) => {
  connection.query('SELECT initiate, frequency, counter FROM goals WHERE id=?', [goalId], (err, results) => {
    if(err) throw err;
    
    const {initiate, frequency, counter} = results[0];
    let initiating = initiate ? true : false;
    if(counter >= frequency) {
      callback({metGoal: initiating, frequency, counter, initiate: initiating});
    } else {
      callback({metGoal: !initiating, frequency, counter, initiate: initiating});
    }
  });
};

/************************************************
 Function:
   Deletes single goal from db

 Inputs:
   goalId Number representing the id of desired goal

 Output:
   None.
   The callback will be given an Object metadata
   about the deletion.
************************************************/
module.exports.deleteGoal = (goalId, callback) => {
  connection.query('DELETE FROM goals WHERE id=?;', [goalId], (err, result) => {
    if(err) throw err;

    callback(result);
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
  bcrypt.genSalt(10, (err, salt) => {
    if(err) throw err;
    bcrypt.hash(password, salt, null, (err, hash) => {
      connection.query('INSERT INTO users (username, password, salt) VALUES (?, ?, ?)', [username, hash, salt], (err, results) => {
        if(err) {
          console.log(err);
        } else {
          callback(results);
        }
      });
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
    
    bcrypt.hash(password, results[0].salt, null, (err, hash) => {
      if(err) throw err;
      if(results[0].password === hash) {
        callback(true);
      } else {
        callback(false);
      }
    });
  });
};

module.exports.addTwitterCreds = (credsObj, callback) => {
  const{username, token, tokenSecret} = credsObj;
  connection.query('UPDATE users SET token=?, tokenSecret=? WHERE username=?;', 
                   [token, tokenSecret, username], (err, results) => {
    if(err) throw err;

    console.log('UPDATE CRED results:', resutls);
    callback(results);
  });
};


// TESTS for inserting and retrieving user, adding goals, and checking if goals are complete
// let testGoal = {
//   'description': 'testing testing',
//   'punishment': 'bad bad',
//   'initiate': false,
//   'frequency': 6,
//   'username': 'Jon Doe'
// };

// let testUser = {
//   'username': 'Jon Doe',
//   'password': 'superawesomepassword'
// };

// exports.insertUserIntoDB(testUser, () => {
//   exports.getAndVerifyUser(testUser, () => {
//     console.log('DONE putting and retrieving user');
//     exports.insertGoalsIntoDB(testGoal, () => {
//       exports.incrementGoalCounter(1, (result) => {
//         console.log(result);
//         exports.checkGoalCompletion(1, (result) => {
//           exports.addTwitterCreds({username: 'Jon', token: 'testToken', tokenSecret: 'testSecret'}, () => {});
//         });
//       });
//     });
//   });
// });