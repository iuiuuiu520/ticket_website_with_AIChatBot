const CompanyService = require('../../services/admin/CompanyService')

const CompanyController = {
    add: async (req, res) => {
        const { name } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''

        await CompanyService.add({ name, avatar })

        res.send({
            ActionType: "OK"
        })
    },

    getList: async (req, res) => {
        const result = await CompanyService.getList(req.params)

        res.send({
            ActionType: "OK",
            data: result
        })
    },

    update: async (req, res) => {
        const { name } = req.body
        const { id } = req.params
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''

        await CompanyService.update({ name, avatar, id })

        res.send({
            ActionType: "OK"
        })
    },

    delList: async (req, res) => {

        await CompanyService.delList({ _id: req.params.id })

        res.send({
            ActionType: "OK"
        })
    }
}


module.exports = CompanyController