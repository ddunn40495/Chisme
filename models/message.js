const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sentBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    text: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
