import express from "express";
import cors from "cors";
import getDbConnectionString from "../config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import setupController from "../controllers/setupController";
import apiController from "../controllers/apiController";
import UserRouter from "../controllers/userController"; //import User Routes

const app: express.Application = express();
app.use(cors());

mongoose.connect(getDbConnectionString(), function (err) {
  if (err instanceof Error) {
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
