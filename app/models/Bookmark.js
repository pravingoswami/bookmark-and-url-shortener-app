const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookmarkSchema = new Schema({
    title : {
        type : String,
        required : true
    },

    originalURL : {
        type : String,
        required : true
    },

    tags : {
        type : [String]
    },

    hashedURL : {
        type : String
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }

})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = Bookmark