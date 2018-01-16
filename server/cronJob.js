const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const sendMotivTweet = require('./auth/twitter').sendMotivTweet;
const db = require('../database-mysql/helpers/models.js');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'doordont.team@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

module.exports.scheduleNotification = (goalInfo) => {
  const {email, goalId, punishment} = goalInfo;
  const rule = new schedule.RecurrenceRule();
  console.log('Scheduling notifiaction:', goalInfo);
  
  // if(process.env.NODE_ENV === 'production') {
  if(process.env.NODE_ENV === 'production') {
    //for production:
    rule.dayOfWeek = 0;
    rule.hour = 18;
    rule.minute = 0;

    //for production testing:
    // rule.dayOfWeek = [0,1,2,3,4,5,6];
  } else {
    //for testing:
    rule.dayOfWeek = [0,1,2,3,4,5,6];
  }
  
  
  
  const job = schedule.scheduleJob(rule, () => {
    db.checkGoalCompletion(goalId, (results) => {

      console.log('Db Results', results);
      if(results && !results.metGoal && punishment === 'email') {
        let message;
        if(results.initiate) {
          message = `You promised to "${results.description}" at least ${results.frequency} times, but you only did it ${results.counter} times!`;
        } else {
          message = `You promised to "${results.description}" less than ${results.frequency} times, but you did it ${results.counter} times!`;
        }

        const mailOptions = {
          from: 'doordont.team@gmail.com',
          to: email,
          subject: 'Goal update',
          text: message
        };
  
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }

          db.resetCounter(goalId, (results) => {
            console.log('Goal counter reset');
          });
        });

      } else if (results && !results.metGoal && punishment === 'twitter') {
        console.log('Getting twitter handle');
        db.getTwitterHandle(goalInfo.username, (twitterHandle) => {
          console.log('Handle:', twitterHandle);
          sendMotivTweet(twitterHandle, results);
        });
      }

    });
  });
};

module.exports.scheduleReminder = (email) => {
  const rule = new schedule.RecurrenceRule();

  if(process.env.NODE_ENV === 'production') {
    //for production:
    rule.dayOfWeek = [3, 6];
    rule.hour = 18;
    rule.minute = 0;
  } else {
    //for testing:
    rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
  }


  const job = schedule.scheduleJob(rule, () => {

    let message = 'Remember to go to doordont.herokuapp.com/goals to check on your goals for this week!';


    const mailOptions = {
      from: 'doordont.team@gmail.com',
      to: email,
      subject: 'Goal reminder',
      text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
};

module.exports.scheduleTweet

//Test
// exports.scheduleEmail('jontmichie@gmail.com', 3);