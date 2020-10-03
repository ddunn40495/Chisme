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
// const async = require("async");
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
  Comment.findByIdAndRemove(req.params.commentId)
    .then((err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    })
    .then(() => {
      Post.find({})
        .sort({ createdAt: 1 })
        .populate({ path: "comments", populate: { path: "postedBy" } })
        .exec((err, posts) => {
          if (err) {
            console.log(err);
          }
          res.json(posts);
        });
    });
});

module.exports = comments;
