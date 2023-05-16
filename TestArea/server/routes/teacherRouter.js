const Router = require('express')
const router = new Router()
const teacherController = require('../controllers/teacherController')

router.post('/', teacherController.create)
router.get('/', teacherController.getAll)
router.get('/:id', teacherController.getById)
router.put('/:id', teacherController.put)
router.delete('/:id', teacherController.delete)

module.exports = router
