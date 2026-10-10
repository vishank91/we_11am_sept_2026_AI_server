const express = require("express")
const path = require("path")
const cors = require("cors")

require("dotenv").config()
require("./utils/db-connect")

const Router = require("./routes/index")

const app = express()
app.use(cors())

app.use(express.json())

app.use("/api", Router)
app.use("/generated_data", express.static(path.join(process.cwd(), "generated_data")));

let PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server is Running`))