const express = require("express");
const app = express();
const cors = require("cors");
const mongoUri = require("./config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const setupController = require("./controllers/setupController");
const apiController = require("./controllers/apiController");
const UserRouter = require("./controllers/userController"); //import User Routes
app.use(cors());

mongoose.connect(mongoUri.getDbConnectionString(), function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected");
  }
});

let port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", UserRouter); // send all "/user" requests to UserRouter for routing

setupController(app);
apiController(app);
