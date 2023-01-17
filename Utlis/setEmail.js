const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper

async function sendEmail(mailOptions) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,// generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    }, 
  });
 
  // send mail with defined transport object
  await transporter.sendMail({
    from: mailOptions.from, // sender address
    to: mailOptions.to, // list of receivers
    subject: mailOptions.subject, // Subject line
    text: mailOptions.text, // plain text body
    html: mailOptions.html, // html body
  });

  console.log("Email has been sent Successfully");
}

module.exports = sendEmail




// const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// async function sendEmail(mailOptions) {
//   // Generate test SMTP service account from ethereal.email

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMPT_USER, // generated ethereal user
//       pass: process.env.SMPT_PASS, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: mailOptions.from, // sender address
//     to: mailOptions.to, // list of receivers
//     subject: mailOptions.subject, // Subject line
//     text: mailOptions.text, // plain text body
//     html: mailOptions.html, // html body
//   });

//   console.log("Email sent Sucessfully");
// }

// module.exports = sendEmail 