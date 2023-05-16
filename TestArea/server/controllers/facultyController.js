const {Faculty}= require('../models/models')
const ApiError = require('../error/ApiError')


class FacultyController {
    async create(req, res,next) {
        try{

         const {facultycode,facultynm} = req.body
         const faculty = await Faculty.create({facultycode,facultynm})
         return res.json(faculty)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const faculties = await Faculty.findAll()
        return res.json(faculties)
    }

    async getById(req, res) {
        const {id} = req.params

        const faculty = await Faculty.findOne(
            {
                where: {id}
            },
        )
        return res.json(faculty)
    }

    async put(req, res) {
        const {id=null}=req.params;
        const {facultycode=null,facultynm=null} = req.body

        const faculty = await Faculty.findOne(
            {
                where: {id}
            },
        )
        
        if (faculty){
        faculty.facultycode=facultycode
        faculty.facultynm=facultynm;
        await faculty.save();
        }
        return res.json(faculty)
    } 
    async delete(req, res) {
        const {id=null} = req.params
        const faculty = await Faculty.destroy(
            {
                where: {id}
            },
        )

        return res.json({})
    } 
}

module.exports = new FacultyController()
