const mongoose = require("mongoose");

const MembersSchema = new mongoose.Schema({
  userId: String,
  users: [],
  type: String,
  username: String,
  chats: [
    {
      text: String,
      sender: String,
      reciver: String
    }
  ]

});

module.exports = mongoose.model("chats", MembersSchema);
