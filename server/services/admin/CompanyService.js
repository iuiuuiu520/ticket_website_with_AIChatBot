const CompanyModel = require('../../models/CompanyModel')


const CompanyService = {
    add: async ({ name, avatar }) => {
        return CompanyModel.create({
            name, avatar
        })
    },

    getList: async ({ id }) => {
        return id ? CompanyModel.find({ _id: id }, ['name', 'avatar']) : CompanyModel.find({}, ['name', 'avatar'])
    },

    update: async ({ name, avatar, id }) => {
        if (avatar) {
            return CompanyModel.updateOne({
                _id: id
            }, {
                name, avatar
            })
        }
        else {
            return CompanyModel.updateOne({
                _id: id
            }, {
                name
            })
        }
    },

    delList: async ({ _id }) => {
        return CompanyModel.deleteOne({ _id })
    }
}


module.exports = CompanyService