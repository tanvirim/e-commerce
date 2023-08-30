const express = require("express")

const errorMiddleware = require("./middleware/error")

const app = express()

app.use(express.json())

//routes import
const allProducts = require("./routes/productRoute")
app.use("/api/v1", allProducts)

//middleware for error
app.use(errorMiddleware)



module.exports = app