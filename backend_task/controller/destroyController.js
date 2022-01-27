module.exports = {
  get: (req, res) => {
    session = req.session;
    if (session.userId) {
      req.session.destroy();
      res.send("Session Destroyed!!!");
    } else {
      res.send("Session Not Found!!!");
    }
  },
};
