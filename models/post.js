const mongoose = require("mongoose");
const { db } = require("./chat");

const postSchema = new mongoose.Schema(
  {
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
