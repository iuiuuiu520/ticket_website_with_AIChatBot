var express = require('express')
const CompanyController = require('../../controllers/admin/CompanyController')
var CompanyRouter = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })


CompanyRouter.post('/adminapi/company/add', upload.single('file'), CompanyController.add)
CompanyRouter.get('/adminapi/company/list',CompanyController.getList)
CompanyRouter.get('/adminapi/company/list/:id',CompanyController.getList)
CompanyRouter.post('/adminapi/company/update/:id', upload.single('file'), CompanyController.update)
CompanyRouter.delete('/adminapi/company/list/:id',CompanyController.delList)


module.exports = CompanyRouter