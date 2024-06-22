const UserModel = require("../../models/UserModel")
const bcrypt = require('bcrypt')
const saltRounds = 10

const UserService = {
    signup: async ({ email, password }) => {
        var role = 1
        const data = await UserModel.find({ email })
        if (data.length > 0) {
            return 'false'
        }
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });

        // Create new user
        await UserModel.create({ email, password: hashedPassword, role });

        // Fetch newly created user data
        const newUser = await UserModel.findOne({ email });
        return newUser; // Return the newly created user data

    },

    login: async ({ email, password }) => {
        const data = await UserModel.find({ email })


        if (data.length > 0) {
            const query = await bcrypt.compare(password, data[0].password)
            if (query === true) {
                return { status: 3, data: data }// Password correct

            } else {
                return { status: 1 }; // Password incorrect
            }
        } else {
            return { status: 2 }
        }
    },

    update: async ({ _id, email, password }) => {
        const data = await UserModel.find({ email })

        if (data.length > 0 && data[0]._id.toString() === _id) {
            console.log(_id)
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) {
                    console.error("Error hashing password:", err);
                } else {
                    UserModel.updateOne({
                        _id
                    }, {
                        password: hash
                    }).then((res) => {
                        return res
                    }).catch((err) => {
                        console.log('eerr', err)
                    })
                }

            })
        } else if (data.length > 0 && data[0]._id.toString() !== _id) {
            return 2
        } else {
            await bcrypt.hash(password, saltRounds, function (err, hash) {
                UserModel.updateOne({
                    _id
                }, {
                    email, password: hash
                }).then((res) => {
                    return res
                }).catch((err) => {
                    console.log('eerr', err)
                })
            })
        }
    },

    add: async ({ email, password, role }) => {

        const data = await UserModel.find({ email })

        if (data.length > 0) {
            return 'false'
        } else {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                return UserModel.create({
                    email, password: hash, role
                })
            })
        }
    },

    getList: async ({ id }) => {
        return id ? UserModel.find({ _id: id }, ['email', 'role']) : UserModel.find({}, ['email', 'role'])
    },

    putList: async (body) => {
        const email = body.email
        const password = body.password
        const _id = body._id
        const data = await UserModel.find({ email })
        if (data.length > 0) {
            return 'false'
        } else {
            await bcrypt.hash(password, saltRounds, function (err, hash) {
                UserModel.updateOne({
                    _id
                }, {
                    email, password: hash
                }).then((res) => {
                    return res
                }).catch((err) => {
                    console.log('eer', err)
                })
            })
        }
    },

    delList: async (_id) => {
        return UserModel.deleteOne({ _id })
    }
}
module.exports = UserService