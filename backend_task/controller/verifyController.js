const User = require("../models/userDB");
const otpuser = require("../models/otpsender");
const multer = require("multer");

const upload = multer({}).none();

module.exports = {
  upload: upload,
  post: (req, res) => {
    session = req.session;
    if (session.userId) {
      otpuser.findOne({ objectId: session.userId }, (err, found) => {
        if (err) throw err;
        if (found.otp == req.body.otp) {
          User.findByIdAndUpdate(
            session.userId,
            { $set: { password: found.password } },
            (err, message) => {
              if (err) throw err;
              res.send("Password Change Successfully!!");
              otpuser.findOneAndDelete(session.userId).exec();
            }
          );
        } else {
          res.send("OTP not Match");
        }
      });
    } else {
      res.send("session expired");
    }
  },
};
