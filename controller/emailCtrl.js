const asyncHandler = require("express-async-handler");
require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = asyncHandler(async (data, req, res) => {
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  
  auth: {
    user: process.env.MAIL_ID,
    pass:process.env.MP,
  }
});


  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hey 👻" <abcd@gmail.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log(nodemailer.getTestMessageUrl(info));

})

module.exports=sendEmail;

