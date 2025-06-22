const jwt = require("jsonwebtoken")

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {  //"jwt k alawa "token" naam v rkh skte ho
        maxAge: 7 * 24 * 60 * 60 * 1000, //millisecond
        httpOnly: true,
        samesite: "strict",
        secure: process.env.NODE_ENV !== "development" //secure srf production m hoga
    })

    return token;
}

module.exports = generateToken
