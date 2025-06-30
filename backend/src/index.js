const express = require("express")
const app = express()
const connectionDb = require("./lib/db")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")
dotenv.config();

const authRoutes = require("./routes/auth.route")
const messageRoutes = require("./routes/message.route")


const PORT = process.env.PORT

app.use(cors({
    origin: "http://localhost:5173",  //frontend url
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.get("/", (req, res) => {
    res.send("welcomt to index page")
})

app.listen(PORT, () => {
    console.log(`listenting on ${PORT}⚡ `)
    connectionDb()

})