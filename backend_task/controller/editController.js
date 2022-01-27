const User = require("../models/userDB");
module.exports = {
  post: (req, res) => {
    session = req.session;
    if (session.userId) {
      User.findByIdAndUpdate(
        session.userId,
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          },
        },
        (err, user) => {
          if (err) throw err;
          console.log(user);
          res.send("Data Updated");
        }
      );
    } else {
      res.send("Session is required");
    }
  },
};
