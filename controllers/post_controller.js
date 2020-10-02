// =======================================
//
//          POST CONTROLLER
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const express = require("express");
const posts = express.Router();
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
//CREATE POST
posts.post("/", (req, res) => {
  console.log(req.body);
  Post.create(req.body, (err, createdPost) => {
    console.log(
      `This is the post you just created ==================================${createdPost}================================================`
    );
    Post.find({}, (err, foundPosts) => {
      res.json(foundPosts);
    });
  });
});

/* ===========
POST ROUTE
============= */
//CREATE COMMENT
posts.post("/:id/comment", (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    Comment.create(req.body, (err, createdComment) => {
      foundPost.comments.push(createdComment);
      foundPost.save((err, data) => {
        res.json(data);
      });
    });
  });
});
/* ===========
GET ROUTE
============= */
//SHOW POST

posts.get("/:id", (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    res.json(foundPost);
  });
});

/* ===========
GET ROUTE
============= */
//INDEX POST
posts.get("/", (req, res) => {
  Post.find({}, (err, foundPosts) => {
    res.json(foundPosts);
  });
});

/* ===========
PUT ROUTE
============= */
//UPDATE POST
posts.put("/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedPost) => {
      console.log(
        `This is the post you just updated ==================================${updatedPost}================================================`
      );
      if (error) {
        res.send(error);
      } else {
        Post.find({}, (err, foundPosts) => {
          res.json(foundPosts);
        });
      }
    }
  );
});

/* ===========
DELETE ROUTE
============= */
//DELETE POST
posts.delete("/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    console.log(
      `This is the request you just deleted ==================================${deletedPost}================================================`
    );
    Post.find({}, (err, foundPosts) => {
      res.json(foundPosts);
    });
  });
});

module.exports = posts;
