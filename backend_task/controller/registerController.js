const bcrypt = require("bcrypt");
const User = require("../models/userDB");

module.exports = {
  post: (req, res) => {
    let emp_id = parseInt(Math.random() * 100000);
    const newUser = new User({
      emp_id: "MD" + emp_id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      phoneNumber: req.body.phoneNumber,
      designation: req.body.designation,
      date_of_joining: req.body.date_of_joining,
      birthDate: req.body.birthDate,
      profilePicture: req.body.profilePicture,
      role: req.body.role,
    });
    User.findOne({ email: req.body.email }, (err, result) => {
      if (err) throw err;
      if (result == null) {
        newUser.save((err, response) => {
          if (err) throw err;
          res.send("New User Registration Successfully!!");
        });
      } else {
        res.send("Email Address already exists!!");
      }
    });
  },
};
