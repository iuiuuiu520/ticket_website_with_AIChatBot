const BookingModel = require('../../models/BookingModel')

const BookingService = {
    add: async({email, companyName, origin, destination, showDate, showTime, quantity }) => {
        return BookingModel.create({email, companyName, origin, destination, showDate, showTime, quantity })
    },

    getList: async({email}) => {
        return BookingModel.find({email},['companyName','origin','destination','showDate','showTime','quantity'])
    }
}


module.exports = BookingService