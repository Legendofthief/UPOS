const Router = require('express')
const router = new Router()
const studentController = require('../controllers/studentController')

router.post('/', studentController.create)
router.get('/', studentController.getAll)
router.get('/:id', studentController.getById)
router.put('/:id', studentController.put)
router.delete('/:id', studentController.delete)

module.exports = router
