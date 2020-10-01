const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
