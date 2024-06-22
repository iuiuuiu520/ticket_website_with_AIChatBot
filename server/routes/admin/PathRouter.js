var express = require('express')
const PathController = require('../../controllers/admin/PathController')
var PathRouter = express.Router()


PathRouter.post('/adminapi/path/add', PathController.add)
PathRouter.get('/adminapi/path/list', PathController.getList)
PathRouter.get('/adminapi/path/list/:id', PathController.getList)
PathRouter.put('/adminapi/path/list/:id', PathController.putList)
PathRouter.delete('/adminapi/path/list/:id', PathController.delList)

//拿到某个origin对应的所有destination
PathRouter.post('/adminapi/path/getdestination', PathController.getDestination)


module.exports = PathRouter;