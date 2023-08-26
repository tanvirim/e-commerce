const app = require("./app")
const dotenv = require("dotenv")
const connectToMongoDB = require("./config/database")



//config
dotenv.config({path:"server/config/config.env"})
//mongo connection
connectToMongoDB()
//listen
app.listen(process.env.PORT, ()=> console.log(`server is running at http://localhost:${process.env.PORT}`) )
 