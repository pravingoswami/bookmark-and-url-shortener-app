const express = require('express')

const router = express.Router()

const bookmarkController = require('../app/controllers/bokkmarkController')


router.get('/bookmarks/tags', bookmarkController.tags)
// router.get('/bookmarks/tags/:name', bookmarkController.tags)


router.get('/bookmarks', bookmarkController.list)
router.post('/bookmarks', bookmarkController.create)
router.get('/bookmarks/:id', bookmarkController.show)
router.put('/bookmarks/:id', bookmarkController.update)
router.delete('/bookmarks/:id', bookmarkController.destroy)
router.get('/:hash', bookmarkController.hash)




module.exports = router