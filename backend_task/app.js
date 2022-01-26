const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const registerRouter = require("./routers/register");

app.use("/", registerRouter);

app.listen(port, () => {
  console.log("listen on port " + port);
});
