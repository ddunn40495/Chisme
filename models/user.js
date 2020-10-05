const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String },
  allPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
