// =======================================
//
//          COMMENT CONTROLLER
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const express = require("express");
const comments = express.Router();
const Chat = require("../models/chat");
const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
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
//CREATE COMMENT
// comments.post("/:id", (req, res) => {
//   Post.findById(req.params.id, (err, foundPost) => {
//     Comment.create(req.body, (err, createdComment) => {
//       foundPost.comments.push(createdComment);
//       foundPost.save((err, data) => {
//         res.json(data);
//       });
//     });
//   });
// });

/* ===========
  DELETE ROUTE
  ============= */
comments.delete("/:commentId", (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId).then((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `This is the comment you just deleted ==================================${data}================================================`
      );
    }

    res.redirect("/posts");
  });
});

module.exports = comments;
