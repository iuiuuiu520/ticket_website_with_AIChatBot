const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TicketType = {
    companyName: String,
    origin: String,
    destination: String,
    date: Date,
    time: Date,
    price: Number,
    amount: Number,
    url: String
}

const TicketModel = mongoose.model('ticket', TicketType)

module.exports = TicketModel