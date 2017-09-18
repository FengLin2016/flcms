var mongoose = require('../db/index')
var Article = new mongoose.Schema({
    title : { type:String },
    describe  : { type:String},
    tags : { type:Array},
    author: { type:String},
    content: { type:String},
    hits:{type:Number,default:0},
    isDel:{type:Boolean,default:false},
    createDate:{type:Date,default:new Date()},
    updateDate:{type:Date,default:new Date()}
})

module.exports = mongoose.model('Article',Article)