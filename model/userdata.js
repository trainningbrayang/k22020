var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userdataSchema = new Schema(
    {
        username: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        },
        name: {
            type: String
        },
        age: {
            type: Number,
            require: false
        }


    }
)
module.exports = mongoose.model('userdata', userdataSchema, 'userdata');