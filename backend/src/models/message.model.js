const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,  //object id rhega jiska ref = User hai
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: "true",

    },
    text: {
        type: String,
    },
    image: {
        type: String,
    }
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema)

module.exports = Message