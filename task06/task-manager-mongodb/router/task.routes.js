const router = require('express').Router()
const taskController = require('../controller/task.controller')

router.get('/add', taskController.addTask)
router.post('/add', taskController.sendData)

router.get('/addType', taskController.addTasktype)
router.post('/addType', taskController.sendTypeData)


router.get("", taskController.showAll)
router.get("/all", taskController.showAll)

router.get('/delete/:id', taskController.delete)

router.get('/single/:id', taskController.showSingle)
router.get('/edit/:id', taskController.editTask)
router.post('/edit/:id', taskController.sendUpdates)


module.exports = router