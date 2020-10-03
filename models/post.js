const mongoose = require("mongoose");
const { db } = require("./chat");

const postSchema = new mongoose.Schema(
  {
    //=======Temporarily leaving this out for testing purposes======
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    //=============== Add it back later if need to be =============
    subject: {
      type: String,
    },
    body: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
