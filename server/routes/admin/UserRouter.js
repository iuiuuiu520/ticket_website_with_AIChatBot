var express = require('express')
const UserController = require('../../controllers/admin/UserController')
var UserRouter = express.Router()


UserRouter.post('/adminapi/user/signup', UserController.signup)
UserRouter.post('/adminapi/user/login', UserController.login)
UserRouter.post('/adminapi/user/update', UserController.update)
UserRouter.post('/adminapi/user/add', UserController.add)
UserRouter.get('/adminapi/user/list', UserController.getList)
UserRouter.get('/adminapi/user/list/:id', UserController.getList)
UserRouter.put('/adminapi/user/list/:id', UserController.putList)
UserRouter.delete('/adminapi/user/list/:id', UserController.delList)


module.exports = UserRouter;
