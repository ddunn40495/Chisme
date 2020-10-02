// =======================================
//
//          USER CONTROLLER
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const express = require("express");
const user = express.Router();
const Chat = require("../models/chat");
const Comment = require("../models/comment");
const User = require("../models/user");
// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//       return next()
//     } else {
//       res.redirect('/sessions/new')
//     }
//   }

// =========================
//      ROUTES
// =========================

/* ===========
POST ROUTE
============= */
//CREATE USER
user.post("/", (req, res) => {
  User.create(req.body, (err, createdUser) => {
    console.log(
      `This is the user you just created ==================================${createdUser}================================================`
    );
    User.find({}, (err, foundUsers) => {
      res.json(foundUsers);
    });
  });
});

/* ===========
GET ROUTE
============= */
//INDEX USER
user.get("/", (req, res) => {
  User.find({}, (err, foundUsers) => {
    res.json(foundUsers);
  });
});

/* ===========
PUT ROUTE
============= */
//UPDATE USER

/* ===========
DELETE ROUTE
============= */
//DELETE USER

module.exports = user;
