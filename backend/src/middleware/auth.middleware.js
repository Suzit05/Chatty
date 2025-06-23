const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const protectRoute = async (req, next, res) => {


    try {
        const token = res.cookies.jwt //jwt naam rkhe hai

        if (!token) {
            return res.status(401).json({ message: "Unauthorized- Token not available" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) //COOKIES KO DECODE KIYA JAA RHA HAI

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized- Invalid user" })
        }

        const user = await User.findById(decoded.userId).select("-password"); //password chor kr

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        req.user = user //jiska req hai usko access de do
        next()  //next function pr chl jaega
    }
    catch (error) {
        console.log("error in protect Route middleware", error.message)
        return res.status(401).json({ message: "Internal server error" })

    }
}

module.exports = protectRoute