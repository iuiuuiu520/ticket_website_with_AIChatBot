const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingType = {
    email: String,
    companyName: String,
    origin: String,
    destination: String,
    showDate: String,
    showTime: String,
    quantity: Number
}

const BookingModel = mongoose.model('booking',BookingType)

module.exports = BookingModel