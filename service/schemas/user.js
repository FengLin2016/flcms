var mongoose = require('../db/index')
var User = new mongoose.Schema({
    name : { type:String },
    pwd  : { type:String}
})

module.exports = mongoose.model('User',User)