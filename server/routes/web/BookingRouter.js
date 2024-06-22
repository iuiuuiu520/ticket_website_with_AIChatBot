var express = require('express')
const BookingController = require('../../controllers/web/BookingController')
var BookingRouter = express.Router()


BookingRouter.post('/webapi/booking/add',BookingController.add)
BookingRouter.get('/webapi/booking/list/:email', BookingController.getList)

module.exports = BookingRouter;