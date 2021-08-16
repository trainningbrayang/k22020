var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var infoSchema = new Schema(
    {
        username: {
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
module.exports = mongoose.model('info', infoSchema, 'info');