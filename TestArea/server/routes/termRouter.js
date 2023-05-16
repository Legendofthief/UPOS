const Router = require('express')
const router = new Router()
const termController = require('../controllers/termController')

router.post('/', termController.create)
router.get('/', termController.getAll)

module.exports = router
