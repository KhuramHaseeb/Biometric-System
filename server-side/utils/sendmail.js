const nodeMailer = require("nodemailer");
require("dotenv").config();
let env = process.env;
exports.sendEmail = (mailData) => {
  console.log(env.MAIL_USER_NAME, env.MAIL_USER_PASSWORD);
  const transporter = nodeMailer.createTransport({
    host: "webmail.approcx.com",
    port: 25,
    secure: false,
    auth: {
      user: env.MAIL_USER_NAME,
      pass: env.MAIL_USER_PASSWORD,
    },
  });
  return transporter
    .sendMail(mailData)
    .then((info) => console.log(`Message sent: ${info.response}`))
    .catch((err) => console.log(`Problem sending email: ${err}`));
};
