const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanyType = {
    name: String,
    avatar: String
}

const CompanyModel = mongoose.model('company', CompanyType)

module.exports = CompanyModel