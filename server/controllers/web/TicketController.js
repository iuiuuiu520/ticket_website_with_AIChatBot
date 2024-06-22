const TicketService = require("../../services/web/TicketService")
const moment = require('moment')



const TicketController = {
    getList: async (req, res) => {
        const { origin, date, destination } = req.body
        const result = await TicketService.getList({ origin, date, destination })

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
        const { amount } = req.body
        const { id } = req.params

        await TicketService.update({ id, amount })

        res.send({
            ActionType: "OK"
        })
    }
}

module.exports = TicketController