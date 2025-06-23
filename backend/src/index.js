const express = require("express")
const app = express()
const connectionDb = require("./lib/db")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
dotenv.config();

const authRoutes = require("./routes/auth.route")


const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("welcomt to index page")
})

app.listen(PORT, () => {
    console.log(`listenting on ${PORT}⚡ `)
    connectionDb()

})