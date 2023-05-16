const {Discipline} =require('../models/models')
const ApiError= require('../error/ApiError')

class DisciplineController {
    async create(req, res,next) {
        try{
        const {disciplinecode,disciplinenm=null} = req.body
        const discipline = await Discipline.create({disciplinecode,disciplinenm})
        return res.json(discipline)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const disciplines = await Discipline.findAll(
            {
                attributes: ['id', 'disciplinecode','disciplinenm']
            }
        )
        return res.json(disciplines)
    }
    async getById(req, res) {
        const {id} = req.params

        const discipline = await Discipline.findOne(
            {
                attributes: ['id', 'disciplinecode','disciplinenm'],
                where: {id}
            },
        )
        return res.json(discipline)
    }

    async put(req, res) {
        const {id=null}=req.params;
        const {disciplinecode=null,disciplinenm=null} = req.body

        const discipline = await Discipline.findOne(
            {
                where: {id}
            },
        )
        
        if (discipline){
        discipline.disciplinecode=disciplinecode;
        discipline.disciplinenm=disciplinenm;
        await discipline.save();
        }
        return res.json(grade)
    } 
    async delete(req, res) {
        const {id=null} = req.params
        const discipline = await Discipline.destroy(
            {
                where: {id}
            },
        )

        return res.json({})
    } 
}

module.exports = new DisciplineController()
