const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PathType = {
    origin: String,
    destination: String
}

const PathModel = mongoose.model('path', PathType)

module.exports = PathModel