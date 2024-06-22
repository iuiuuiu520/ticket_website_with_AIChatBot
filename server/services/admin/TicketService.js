const TicketModel = require('../../models/TicketModel')

const TicketService = {
    add: async ({ companyName, origin, destination, date, time, amount, price }) => {
        amount = parseInt(amount)
        const result = await TicketModel.create({ companyName, origin, destination, date, time, amount, price })
        const url = 'http://localhost:8080/purchaseticket/' + result._id
        return TicketModel.updateOne({ _id: result._id }, { url })
    },

    getList: async ({ id }) => {
        return id ? TicketModel.find({ _id: id }, ['companyName', 'origin', 'destination', 'date', 'time', 'amount', 'price', 'url']) : TicketModel.find({}, ['companyName', 'origin', 'destination', 'date', 'time', 'amount', 'price', 'url'])
    },

    update: async ({ _id, companyName, origin, destination, date, time, amount, price }) => {
        amount = parseInt(amount)

        return TicketModel.updateOne({ _id }, { companyName, origin, destination, date, time, amount, price })
    },

    delete: async ({ id }) => {
        return TicketModel.deleteOne({ _id: id })
    }
}

module.exports = TicketService