//routes bda na ho jaye , isliye hrr route k separate controller bnaya jaye
const generateToken = require("../lib/utils")
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")

const signup = async (req, res) => {
    const { fullName, email, password, profilePic } = req.body  //index.js m "app.use(express.json()) likh lo"
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Enter all the credentials" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be greater than 6 digits" })
        }
        //password greater hai to user create kr lo
        const user = await User.findOne({ email }) //agr user phle se hai
        if (user) return res.status(400).json({ message: "Email already exist" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = User({
            fullName,
            email,
            password: hashedPassword,
        })

        if (newUser) {
            //generate jwt token
            generateToken(newUser._id, res) //from utils
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }
        else {
            return res.status(400).json({ message: "Invalid user data" })
        }
    }
    catch (error) {
        console.log("error in signup controller", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
    res.send("sign up page 2")
}

const login = (req, res) => {
    res.send("login page 2")
}


const logout = (req, res) => {
    res.send("logout page 2")
}


module.exports = { signup, login, logout }