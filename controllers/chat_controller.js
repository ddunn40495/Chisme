// =======================================
//
//          CHAT CONTROLLER
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const express = require("express");
const chisme = express.Router();
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

/* ===========
GET ROUTE
============= */
//INDEX CHAT
chisme.get("/", (req, res) => {
  Chat.find({}, (err, foundChats) => {
    res.json(foundChats);
  });
});

/* ===========
PUT ROUTE
============= */
//UPDATE CHAT
chisme.put("/:id", (req, res) => {
  Request.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedRequest) => {
      console.log(
        `This is the request you just updated ==================================${updatedRequest}================================================`
      );
      if (error) {
        res.send(error);
      } else {
        Request.find({}, (err, foundRequests) => {
          res.json(foundRequests);
        });
      }
    }
  );
});

/* ===========
DELETE ROUTE
============= */
//DELETE CHAT
requests.delete("/:id", (req, res) => {
  Request.findByIdAndRemove(req.params.id, (err, deletedRequest) => {
    console.log(
      `This is the request you just deleted ==================================${deletedRequest}================================================`
    );
    Request.find({}, (err, foundRequests) => {
      res.json(foundRequests);
    });
  });
});

module.exports = chat;
