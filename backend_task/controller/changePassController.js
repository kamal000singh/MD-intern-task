const otpuser = require("../models/otpsender");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const multer = require("multer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.USER_ID, pass: process.env.USER_PASSWORD },
});
module.exports = {
  upload: multer({}).none(),
  post: (req, res) => {
    session = req.session;
    if (session.userId) {
      let otp = parseInt(Math.random() * 1000000);
      let sendOTP = {
        from: process.env.USER_ID,
        to: req.body.email,
        subject: "OTP verification",
        html: `<center>
            <h2>verify your OTP</h2>
            <h1>${otp}</h1>
          </center>`,
      };
      otpuser.findOne({ objectId: session.userId }, (err, found) => {
        if (err) throw err;
        if (!found) {
          transporter.sendMail(sendOTP, (err, message) => {
            let user = new otpuser({
              objectId: session.userId,
              password: bcrypt.hashSync(req.body.newPassword, 10),
              otp: otp,
            });
            user.save((err, result) => {
              setTimeout(() => {
                otpuser.findOneAndDelete(session.userId).exec();
              }, 1000 * 60 * 5);
              res.send("OTP send");
            });
          });
        } else {
          res.send("OTP send failed");
        }
      });
    } else {
      res.send("Session Expired");
    }
  },
};
