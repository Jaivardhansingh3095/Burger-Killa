const nodemailer = require('nodemailer');

const sendEmails = async (options) => {
  //CREATE TRANSPORTER object
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_EMAIL_HOST,
    port: process.env.MAILTRAP_EMAIL_PORT,
    auth: {
      user: process.env.MAILTRAP_EMAIL_USERNAME,
      pass: process.env.MAILTRAP_EMAIL_PASSWORD,
    },
  });

  //DEFINE MAIL options
  const mailOptions = {
    from: 'Admin <admin@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //sending mail
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmails;

// const FormData = require('form-data'); // form-data v4.0.1
// const Mailgun = require('mailgun.js'); // mailgun.js v11.1.0

// async function sendEmail() {
//   const mailgun = new Mailgun(FormData);
//   const mg = mailgun.client({
//     username: 'api',
//     key: process.env.MAILGUN_API_KEY,
//     // When you have an EU-domain, you must specify the endpoint:
//     // url: "https://api.eu.mailgun.net"
//   });
//   try {
//     const data = await mg.messages.create(
//       'sandboxa1e21c22c37245f4ba27c26d3a20a5f8.mailgun.org',
//       {
//         from: 'Mailgun Sandbox <postmaster@sandboxa1e21c22c37245f4ba27c26d3a20a5f8.mailgun.org>',
//         to: ['Jaivardhan Singh <jaivardhansingh9530@gmail.com>'],
//         subject: 'Hello Jaivardhan Singh',
//         text: 'Congratulations Jaivardhan Singh, you just sent an email with Mailgun! You are truly awesome!',
//       },
//     );

//     console.log(data); // logs response data
//   } catch (error) {
//     console.log(error); //logs any error
//   }
// }

// module.exports = sendEmail;
