var express = require('express')
const TicketController = require('../../controllers/web/TicketController')
var TicketRouter = express.Router()

TicketRouter.post('/webapi/ticket/list', TicketController.getList)
TicketRouter.post('/webapi/ticket/updateAmount/:id', TicketController.update)


module.exports = TicketRouter;