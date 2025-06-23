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

}

const login = async (req, res) => {
    const { email, password } = req.body
    try {

        if (!email || !password) {
            return res.status(400).json({ message: "Enter all the credentials" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" }) //invalid dikha rhe to be aware from the hacker
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        //if password correct
        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })


    }
    catch (error) {
        console.log("error in login controller", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }

}


const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })  //cookie (jwt) ko khali kr diye
        return res.status(200).json({ message: "Logout successfully" })
    }
    catch (error) {
        console.log("error in Logout controller", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const updateProfile = async (req, res) => {
    //yha kaam kro
}


module.exports = { signup, login, logout, updateProfile }