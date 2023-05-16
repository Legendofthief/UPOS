const Router = require('express')
const router = new Router()
const groupController = require('../controllers/groupController')

router.post('/', groupController.create)
router.get('/', groupController.getAll)
router.get('/:id', groupController.getById)
router.put('/:id', groupController.put)
router.delete('/:id', groupController.delete)

module.exports = router
