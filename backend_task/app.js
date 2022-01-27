const express = require("express");
const sessions = require("express-session");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

app.use(
  sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: true,
  })
);

const registerRouter = require("./routers/register");
const loginRouter = require("./routers/login");
const editRouter = require("./routers/edit");
const destroyRouter = require("./routers/destroy");

app.use("/", registerRouter);
app.use("/", loginRouter);
app.use("/", editRouter);
app.use("/", destroyRouter);

app.listen(port, () => {
  console.log("listen on port " + port);
});
