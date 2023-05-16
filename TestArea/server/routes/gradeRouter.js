const Router = require('express')
const router = new Router()
const gradeController = require('../controllers/gradeController')

router.post('/', gradeController.create)
router.get('/', gradeController.getAll)
router.get('/:id', gradeController.getById)
router.put('/:id', gradeController.put)
router.delete('/:id', gradeController.delete)

module.exports = router
