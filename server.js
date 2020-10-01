// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
// =======================================
//              MIDDLEWARE
// =======================================
require("dotenv").config();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// const whitelist = [
//   "http://localhost:3000",
//   "https://fathomless-sierra-68956.herokuapp.com",
//   "http://127.0.0.1:5500",
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));

// =======================================
//              DATABASE
// =======================================
const port = process.env.PORT || 3004;
const mongoURI = process.env.MONGODB_URI;
const db = mongoose.connection;
const dbName = process.env.DBNAME;

// =======================================
//      MONGOOSE CONNECTION LOGIC
// =======================================
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("the connection with mongod is established");
  }
);
db.once("open", () => {
  console.log("mongo connected: ", dbName);
});
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("disconnected", () => console.log("mongo disconnected"));
// =======================================
//          CONTROLLERS
// =======================================
const chatController = require("./controllers/chat_controller.js");
app.use("/chisme", chatController);
const userController = require("./controllers/user_controller.js");
app.use("/user", userController);
// =======================================
//              ROUTES
// =======================================

// =======================================
//              LISTENER
// =======================================
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
