const PathModel = require('../../models/PathModel')

const PathService = {
    add: async ({ origin, destination }) => {
        origin = origin.trim()
        destination = destination.trim()
        return PathModel.create({
            origin, destination
        })
    },

    getList: async ({ id }) => {
        return id ? PathModel.find({ _id: id }, ['origin', 'destination']) : PathModel.find({}, ['origin', 'destination'])
    },

    putList: async ({ _id, origin, destination }) => {
        origin = origin.trim()
        destination = destination.trim()
        return PathModel.updateOne({
            _id
        }, {
            origin, destination
        })
    },

    delList: async ({ id }) => {
        return PathModel.deleteOne({ _id: id })
    },

    getDestination: async ({ origin }) => {
        return PathModel.find({origin},['destination'])
    }
}

module.exports = PathService