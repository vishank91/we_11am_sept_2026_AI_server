const express = require("express")

require("dotenv").config()
require("./utils/db-connect")

const Router = require("./routes/index")

const app = express()
app.use(express.json())

app.use("/api", Router)

let PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server is Running`))