const mongoose = require('mongoose')

const userShegma = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }, email: {
        type: String,
        require: true,
        unique: true
    }, gender: {
        type: String,
        require: true,
        enums: ['male', 'female', 'others']
    }

}, { timestamps: true })

const User = mongoose.model('user', userShegma)

module.exports = User;