const User = require("../models/user.model")
const cloudinary = require("../lib/cloudinary")
const Message = require("../models/message.model")

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        //loggedinUser k alawa baki sbhi users k details

        res.status(200).json(filteredUsers)
    }
    catch (error) {
        res.status(400).json({ message: "Internal server error" });
        console.log("error in message controller", error.message)
    }
}


const getMessages = async (req, res) => {
    try {
        const { id: usertoChatId } = req.params;
        const myId = req.user._id

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: usertoChatId },  //waisa msg dhundo jo myId or usertoChatId k bich m hua ho
                { senderId: usertoChatId, receiverId: myId }
            ]
        })

        res.status(200).json(messages)
    }
    catch (error) {
        console.log("error in message controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

const sendMessage = async (req, res) => {
    const { id: receiverId } = req.params
    const senderId = req.user._id

    const { text, image } = req.body;

    let imageUrl;
    if (image) {
        //upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image),
            imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl
    })

    await newMessage.save()

    //todo:realtime functionality goes here

    res.status(201).json(newMessage)
}

module.exports = { getUsersForSidebar, getMessages, sendMessage }