const Bookmark = require('../models/Bookmark')
const sh = require("shorthash")
const validator = require('validator')

module.exports.list = (req, res) => {
    Bookmark.find()
        .then(bookmark => res.json(bookmark))
        .catch(err => res.json(err))
}

module.exports.create = (req, res) => {

    const body = req.body
    const bookmark = new Bookmark(body)
    bookmark.save()
        .then(bookmark => res.json(bookmark))
        .catch(err => res.json(err))

    // const body = req.body
    // const url = validator.isURL(body.originalURL, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false, disallow_auth: false })
    // if(url){
    //     body.hashedURL = sh.unique(body.originalURL)
    //     const bookmark = new Bookmark(body)
    //     bookmark.save()
    //         .then(bookmark => res.json(bookmark))
    //         .catch(err => res.json(err))
    // }
    // else {
    //     res.json({error : "Enter Valid URL"})
    // }
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Bookmark.findById(id)
        .then(bookmark => bookmark ? res.json(bookmark) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    if(body.originalURL){
        const url = validator.isURL(body.originalURL)
        if(url){
            body.hashedURL = sh.unique(body.originalURL, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false, disallow_auth: false })
            Bookmark.findByIdAndUpdate(id, body, {new : true, runValidators : true})
                .then(bookmark => bookmark ? res.json(bookmark) : res.json({}))
                .catch(err => res.json(err))
        }
        else {
            res.json({error : "Enter Valid URL"})
        }
    } else {
        Bookmark.findByIdAndUpdate(id, body, {new : true, runValidators : true})
                .then(bookmark => bookmark ? res.json(bookmark) : res.json({}))
                .catch(err => res.json(err))
    }
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Bookmark.findByIdAndDelete(id)
        .then(bookmark => bookmark ? res.json(bookmark) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.hash = (req, res) => {
    const hashedURL = req.params.hash
    Bookmark.findOne({hashedURL : hashedURL})
        // .then(bookmark => bookmark ? res.json(bookmark) : res.json({}))
        // .then(bookmark => bookmark ? res.redirect(`${bookmark.originalURL}`) : res.json({}))
        .then(bookmark => {
            if(bookmark){
                // console.log(bookmark)
                return res.redirect(bookmark.originalURL)
            }
        })

        
        .catch(err => res.json(err))
}

module.exports.tags = (req, res) => {
    if(req.query.names){
        const tags = req.query.names.split(',')
    Bookmark.find({tags : {"$in" : tags}})
        .then(bookmark => bookmark ? res.json(bookmark) : res.json({}))
        .catch(err => res.json(err))
    } else {
        res.json({error : "Enter Valid tags", params : req.params.name})
    }
}