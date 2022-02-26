const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
    }
})

const Users = mongoose.model("users", userSchema);

module.exports = {
    Users: Users
};