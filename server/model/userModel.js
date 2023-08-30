const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required:[true , 'Please Enter Your Name'],
        maxLength: [30 , 'name can not be exceed 30 characters'],
        minLength: [3, 'name should be more than 3 characters']
    },
    email:{
        type: String,
        required:[true , 'Please Enter Your Email'],
        unique: true ,
        validate: [validator.isEmail , 'please enter a valid email'],

    },
    password: {
        type: String,
        required:[true , 'Please Enter Your Name'],
        minLength: [8, 'name should be more than 3 characters'],
        select: false ,

    },
    avatar: {
        public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPsswordToken: String,
    resetPasswordExpire: Date ,
})

const User = mongoose.model('User', userSchema)

module.exports = User