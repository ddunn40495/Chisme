// =======================================
//
//          POST CONTROLLER
//
// =======================================

// =========================
//       DEPENDENCIES
// =========================
const express = require("express");
// const async = require("async");
const posts = express.Router();
const Chat = require("../models/chat");
const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
const comments = require("./comment_controller");
const { post } = require("./comment_controller");
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
  Post.create(req.body, (err, createdPost) => {
    console.log(
      `This is the post you just created ==================================${createdPost}================================================`
    );

    res.redirect("/posts");
  });
});

/* ===========
POST ROUTE
============= */
//CREATE COMMENT
posts.post("/:postId/comment", (req, res) => {
  Post.findById(req.params.postId, (err, foundPost) => {
    Comment.create(req.body, (err, createdComment) => {
      foundPost.comments.push(createdComment);
      foundPost.save((err, data) => {
        // console.log(err)
        res.redirect("/posts");
      });
    });
  });
});

/* ===========
GET ROUTE
============= */
//SHOW POST

posts.get("/:postId", (req, res) => {
  Post.findById(req.params.postId, (err, foundPost) => {
    res.json(foundPost);
  });
});

/* ===========
GET ROUTE
============= */
//INDEX POST
posts.get("/", (req, res) => {
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

/* ===========
PUT ROUTE
============= */
//UPDATE POST
// posts.put("/:postId", (req, res) => {
//   Post.findByIdAndUpdate(
//     req.params.postId,
//     req.body,
//     { new: true },
//     (error, updatedPost) => {
//       console.log(
//         `This is the post you just updated ==================================${updatedPost}================================================`
//       );
//       if (error) {
//         res.send(error);
//       } else {
//         Post.find({})
//           .sort({ createdAt: 1 })
//           .populate({ path: "comments", populate: { path: "postedBy" } })
//           .exec((err, posts) => {
//             if (err) {
//               console.log(err);
//             }
//             res.json(posts);
//           });
//       }
//     }
//   );
// });

/* ===========
PATCH ROUTE
============= */
//UPDATE POST
posts.patch("/:postId", (req, res) => {
  console.log(req.body);
  Post.findByIdAndUpdate(
    req.params.postId,
    req.body,
    { new: true, omitUndefined: false },
    (error, updatedPost) => {
      console.log(
        `This is the post you just updated ==================================${updatedPost}================================================`
      );
      if (error) {
        res.send(error);
      } else {
        Post.find({})
          .sort({ createdAt: 1 })
          .populate({ path: "comments", populate: { path: "postedBy" } })
          .exec((err, posts) => {
            if (err) {
              console.log(err);
            }
            res.json(posts);
          });
      }
    }
  );
});

/* ===========
PUT ROUTE
============= */
//UPDATE COMMENT
posts.put("/:postId/comment/:commentId", (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    req.body,
    { new: true },
    (error, updatedComment) => {
      console.log(
        `This is the post you just updated ==================================${updatedComment}================================================`
      );
      if (error) {
        res.send(error);
      } else {
        res.json(updatedComment);
      }
    }
  );
});

/* ===========
DELETE ROUTE
============= */
//DELETE COMMENT

// posts.delete("/:postId/comment/:commentId", (req, res) => {
//   console.log(req.params);
// });

// /* ===========
// DELETE ROUTE
// ============= */
// //DELETE COMMENT

// posts.delete("/:postId/comment/:commentId", (req, res) => {
//   Comment.findByIdAndRemove(req.params.commentId).then((err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(
//         `This is the comment you just deleted ==================================${data}================================================`
//       );
//     }

//     res.redirect("/posts");
//   });
// });

/* ===========
DELETE ROUTE
============= */
//DELETE POST

posts.delete("/:postId", (req, res) => {
  Post.findByIdAndRemove(req.params.postId).then((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `This is the post you just deleted ==================================${data}================================================`
      );
    }

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

module.exports = posts;

///graveyard

//delete routes for post

// posts.delete("/:postId", (req, res) => {
//   Post.findByIdAndRemove(req.params.postId, (err, deletedPost) => {
//     console.log(
//       `This is the request you just deleted ==================================${deletedPost}================================================`
//     );
//     Post.find({})
//       .populate("comments")
//       .exec((err, posts) => {
//         if (err) {
//           console.log(err);
//         }
//         res.json(posts);
//       });
//   });
// });

// posts.delete("/:postId", (req, res) => {
//   Post.findByIdAndRemove(req.params.postId)
//     .then((err, deletedPost) => {
//       console.log(
//         `This is the request you just deleted ==================================${deletedPost}================================================`
//       );
//     })
//     .then(() => {
//       Post.find({})
//         .populate("comments")
//         .exec((err, posts) => {
//           if (err) {
//             console.log(err);
//           }
//           res.json(posts);
//         });
//     });
// });

// put routes for comments
// post.put("/:postId/comment/:commentId", (req, res) => {
//   async.waterfall([findComment, findPost, sendPost], (err, data) => {});
//   const findComment = () => {
//     const comment = await Comment.findByIdAndUpdate(req.params.comment.Id, req.body, {
//       new: true,
//     });
//     return comment
//   };
//   const findPost = () => {
//     const post = await Post.findById(req.params.postId, (err, foundPost))
//     return post
//   };
//   const sendPost = () => {

//   }
// });
