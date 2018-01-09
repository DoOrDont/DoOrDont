const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'doordont.team@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
  from: 'doordont.team@gmail.com',
  to: 'jontmichie@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


module.exports.scheduleEmail = (email, message) => {
  const rule = new schedule.RecurrenceRule();
  //for production:
  // rule.dayOfWeek = 0;
  // rule.hour = 18;
  // rule.minute = 0;
  
  //for testing:
  rule.dayOfWeek = [0,1,2,3,4,5,6];
  
  const job = schedule.scheduleJob(rule, () => {
    console.log('email:', email);
    console.log('message', message);
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
};

//Test
// exports.scheduleEmail('jon@example.com', 'Hello World');