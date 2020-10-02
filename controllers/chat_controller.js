// =======================================
//
//          CHAT CONTROLLER
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const express = require("express");
const chat = express.Router();
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
//CREATE CHAT
chat.post("/", (req, res) => {});
/* ===========
GET ROUTE
============= */
//INDEX CHAT
chat.get("/", (req, res) => {
  Chat.find({}, (err, foundChats) => {
    res.json(foundChats);
  });
});

/* ===========
PUT ROUTE
============= */
//UPDATE CHAT

/* ===========
DELETE ROUTE
============= */
//DELETE CHAT

module.exports = chat;
