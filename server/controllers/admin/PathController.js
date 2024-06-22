const PathService = require('../../services/admin/PathService')


const PathController = {
    add: async (req, res) => {
        const { origin, destination } = req.body
        await PathService.add({ origin, destination })


        res.send({
            ActionType: 'OK'
        })
    },

    getList: async(req, res) => {
        const result = await PathService.getList(req.params)


        res.send({
            ActionType: "OK",
            data: result
        })
    },

    putList: async(req, res) => {
        const {_id, origin, destination} = req.body
        await PathService.putList({_id, origin, destination})

        res.send({
            ActionType: "OK"
        })
    },

    delList: async(req, res) => {
        await PathService.delList(req.params)

        res.send({
            ActionType: "OK"
        })
    },

    getDestination: async(req, res) => {
        const { origin } = req.body
        const result = await PathService.getDestination({origin})

        res.send({
            ActionType: "OK",
            data: result
        })
    }
}

module.exports = PathController