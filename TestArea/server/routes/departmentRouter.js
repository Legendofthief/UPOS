const Router = require('express')
const router = new Router()
const departmentController = require('../controllers/departmentController')

router.post('/', departmentController.create)
router.get('/', departmentController.getAll)
router.get('/:id', departmentController.getById)
router.put('/:id', departmentController.put)
router.delete('/:id', departmentController.delete)

module.exports = router
