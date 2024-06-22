var express = require('express')
const TicketController = require('../../controllers/admin/TicketController')
var TicketRouter = express.Router()


TicketRouter.post('/adminapi/ticket/add', TicketController.add)
TicketRouter.get('/adminapi/ticket/list',TicketController.getList)
TicketRouter.get('/adminapi/ticket/list/:id', TicketController.getList)
TicketRouter.put('/adminapi/ticket/list/:id', TicketController.update)
TicketRouter.delete('/adminapi/ticket/list/:id', TicketController.delete)


module.exports = TicketRouter;