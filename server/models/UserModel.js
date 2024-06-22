const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserType = {
    email:String,
    password:String,
    role:Number 
}

const UserModel = mongoose.model('user', new Schema(UserType))

module.exports = UserModel