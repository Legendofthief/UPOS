const Router = require('express')
const router = new Router()
const disciplineController = require('../controllers/disciplineController')

router.post('/', disciplineController.create)
router.get('/', disciplineController.getAll)
router.get('/:id', disciplineController.getById)
router.put('/:id', disciplineController.put)
router.delete('/:id', disciplineController.delete)

module.exports = router
