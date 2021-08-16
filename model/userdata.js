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
        }
    }
)
module.exports = mongoose.model('userdata', userdataSchema, 'userdata');