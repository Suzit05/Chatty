const mongoose = require("mongoose")

const connectionDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongodb connected: ${conn.connection.host}`)
    }
    catch (error) {
        console.log("Mongodb connection error:", error)
    }
}

module.exports = connectionDb