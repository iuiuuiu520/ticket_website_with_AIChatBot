const BookingService = require("../../services/web/BookingService")


const BookingController = {
    add: async (req, res) => {
        const { email, companyName, origin, destination, showDate, showTime, quantity } = req.body
        const result = await BookingService.add({ email, companyName, origin, destination, showDate, showTime, quantity })
        console.log(result)
        res.send({
            ActionType: "OK"
        })
    },

    getList: async(req, res) => {
        const { email } = req.params
        const result = await BookingService.getList({email})
        
        res.send({
            ActionType:"OK",
            data: result
        })
    }
}

module.exports = BookingController