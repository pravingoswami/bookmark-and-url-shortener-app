const mongoose = require('mongoose')
const sh = require("shorthash")
const validator = require('validator')

const Schema = mongoose.Schema

const bookmarkSchema = new Schema({
    title : {
        type : String,
        required : true
    },

    originalURL : {
        type : String,
        required : true,
        validate : {
            validator : function(value){
                return validator.isURL(value)
            },
            message : function(){
                return 'Enter valid url'
            }
        }
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

bookmarkSchema.pre('save', function(next){
    const bookmark = this
    if(bookmark.isNew){
        bookmark.hashedURL = sh.unique(bookmark.originalURL)
        next()
    } else {
        next()
    }

})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = Bookmark