const TicketService = require("../../services/admin/TicketService")
const moment = require('moment')


const TicketController = {
    add: async (req, res) => {
        const { companyName, origin, destination, date, time, amount, price } = req.body
        await TicketService.add({ companyName, origin, destination, date, time, amount, price })

        res.send({
            ActionType: "OK"
        })
    },

    getList: async (req, res) => {
        const result = await TicketService.getList(req.params)
        result.forEach(obj => {
            obj._doc.showTime = moment(obj.time).format('h:mm:ss a');
            obj._doc.showDate = moment(obj.date).format('Do MMMM YYYY');
        });

        res.send({
            ActionType: "OK",
            data: result
        })
    },

    update: async (req, res) => {
        const { _id, companyName, origin, destination, date, time, amount, price } = req.body
        await TicketService.update({ _id, companyName, origin, destination, date, time, amount, price })
        res.send({
            ActionType: "OK"
        })
    },

    delete: async (req, res) => {
        await TicketService.delete(req.params)

        res.send({
            ActionType: "OK"
        })
    }
}

module.exports = TicketController