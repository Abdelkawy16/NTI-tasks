const router = require('express').Router()
const userController = require('../controller/user')


router.get('', userController.home)
router.get('/all', userController.showAll)
router.get('/add', userController.add)
router.get('/addPost', userController.addPost)
router.post('/addPost', userController.sendData)
router.get('/single/:id', userController.showSingle)
router.get('/delete/:id', userController.del)
router.get('/edit/:id', userController.edit)
router.post('/edit/:id', userController.save)


module.exports = router