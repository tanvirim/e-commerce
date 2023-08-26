const express = require("express")

const app = express()

app.use(express.json())

//routes import
const allProducts = require("./routes/productRoute")
app.use("/api/v1", allProducts)



module.exports = app