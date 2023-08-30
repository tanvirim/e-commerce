const mongoose = require("mongoose");

const  connectToMongoDB = ()=> {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
}

module.exports = connectToMongoDB;
