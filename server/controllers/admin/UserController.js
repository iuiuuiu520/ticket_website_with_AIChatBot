const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")


const UserController = {
    signup: async (req, res) => {
        const { email, password } = req.body


        const status = await UserService.signup({ email, password })

        console.log(status)
        if (status === 'false') {
            res.send({
                ActionType: 'false'
            })
        } else {
            const token = JWT.generate({
                _id: status._id,
                email: status.email,
                role: status.role
            }, '1d')

            res.header("Authorization", token)
            res.send({
                ActionType: 'OK',
                data: {
                    email: status.email,
                    role: status.role
                }
            })
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body

        var result = await UserService.login({ email, password })

        if (result.status === 1) {
            res.send({
                ActionType: 1,
                Message: "Password Incorrect"
            })
        } else if (result.status === 2) {

            res.send({
                ActionType: 3,
                Message: "Email does'nt exist!"
            })
        } else {

            const token = JWT.generate({
                _id: result.data[0]._id,
                email: result.data[0].email,
                role: result.data[0].role
            }, '1d')

            res.header("Authorization", token)
            res.send({
                ActionType: 'OK',
                data: {
                    email: result.data[0].email,
                    role: result.data[0].role
                }
            })
        }
    },

    update: async (req, res) => {
        const { email, password } = req.body

        const token = req.headers['authorization'].split(' ')[1]

        var payload = JWT.verify(token)


        var result = await UserService.update({ _id: payload._id,email, password })

        if (result !== undefined) {
            res.send({
                ActionType: 1
            })
        } else {
            res.send({
                ActionType: 'OK',
                data: {
                    email
                }
            })
        }
    },

    add: async (req, res) => {
        const { email, password, role } = req.body


        const status = await UserService.add({ email, password, role })

        if (status === 'false') {
            res.send({
                ActionType: 'false'
            })
        } else {
            res.send({
                ActionType: 'OK'
            })
        }
    },

    getList: async(req, res) => {
        const result = await UserService.getList(req.params)

        res.send({
            ActionType: 'OK',
            data: result
        })
    },

    putList: async(req, res) => {
        const result = await UserService.putList(req.body)

        if (result === 'false') {
            res.send({
                ActionType: 'false'
            })
        } else {
            res.send({
                ActionType: 'OK'
            })
        }
    },

    delList: async(req, res) => {
        const result = await UserService.delList({_id : req.params.id})

        res.send({
            ActionType: 'OK'
        })
    }
}

module.exports = UserController