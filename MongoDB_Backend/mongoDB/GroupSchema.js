const mongoose = require("mongoose");

const GroupsSchema = new mongoose.Schema({
    users: [],
    type: String,
    name: String,
    chats: [
        {
            text: String,
            sender: String
        }
    ]
}
);

module.exports = mongoose.model("groupchats", GroupsSchema);
