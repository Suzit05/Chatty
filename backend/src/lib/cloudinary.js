const cloudinary = require("cloudinary")
const dotenv = require("dotenv")
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINAR_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports = cloudinary
