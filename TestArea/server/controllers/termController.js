const {Term} =require('../models/models')
const ApiError= require('../error/ApiError')

class TermController {
    async create(req, res,next) {
        try{
        const {termcode,termtype,termqnt} = req.body
        const term = await Term.create({termcode,termtype,termqnt})
        return res.json(term)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const terms = await Term.findAll()
        return res.json(terms)
    }
}

module.exports = new TermController()
