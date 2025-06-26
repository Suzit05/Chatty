const express = require("express")
const { signup, login, logout, updateProfile, checkAuth } = require("../controllers/auth.controller")
const protectRoute = require("../middleware/auth.middleware")
const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/update-profile", protectRoute, updateProfile) //profile pic update k liye , middle ware use kiya gya hai

router.get("/check", protectRoute, checkAuth) //to validate or return login user details
module.exports = router