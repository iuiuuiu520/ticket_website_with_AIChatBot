const TicketModel = require('../../models/TicketModel')
const moment = require('moment')

const TicketService = {
    getList: async ({ origin, date, destination }) => {
        var newDate = moment(date).format()
        var year = parseInt(newDate.split('T')[0].split('-')[0])
        var month = parseInt(newDate.split('T')[0].split('-')[1])
        var day = parseInt(newDate.split('T')[0].split('-')[2])
        var start = new Date(year, month - 1, day)
        start.setHours(0, 0, 0, 0)
        console.log(start)
        var end = new Date(year, month - 1, day)
        end.setHours(23, 59, 59, 999)
        console.log(end)
        return TicketModel.find({
            origin: origin,
            destination: destination,
            date: {
                $gte: start,
                $lt: end
            }
        }, ['companyName', 'origin', 'destination', 'date', 'time', 'amount', 'price'])
    },

    update: async ({ id, amount }) => {
        return TicketModel.updateOne({ _id: id }, { amount })
    }
}


module.exports = TicketService