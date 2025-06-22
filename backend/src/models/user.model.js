const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    profilePic: {
        type: String, //pic string m bdl jata hai
        default: "",
    }
},
    { timestamps: true } //createdAt and updatedAt jaanne k liye
)

const User = mongoose.model("User", userSchema)  //"User" (hmesa singular m naam rkhna hai) naam hai jisme userSchema k value hai

module.exports = User