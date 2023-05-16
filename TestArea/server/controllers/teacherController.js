const {Teacher} =require('../models/models')
const {Department} =require('../models/models')
const ApiError= require('../error/ApiError')

/*
 req.files
 req.body
 req.query   ?id=2
 req.params
*/

class TeacherController {
    async create(req, res,next) {
        try{
        let {departmentId=null,department=null,recordnum=null,fio=null,qualification=null,startdt=null,enddt=null} = req.body;

        if(!department){department={id:null}}
        if(!departmentId){departmentId=department.id}

        const teacher = await Teacher.create({departmentId:departmentId,recordnum,fio,qualification,startdt,enddt})
        return res.json(teacher)
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const teachers = await Teacher.findAll(
            {
                attributes: ['id','departmentId','recordnum','fio','qualification','startdt','enddt'],
                include: [
                    {
                      model: Department,
                      required: false,
                      attributes: ['id', 'departmentcode','departmentnm']
                    }
                ]
            }
        )
        return res.json(teachers)
    }

    async getById(req, res) {
        const {id} = req.params
        const teacher = await Teacher.findOne(
            {
                attributes: ['id','departmentId','recordnum','fio','qualification','startdt','enddt'],
                include: [
                    {
                      model: Department,
                      required: false,
                      attributes: ['id', 'departmentcode','departmentnm']
                    }
                ],
                where: {id}
            }
        )
        return res.json(teacher)
    }

    async put(req, res) {
        const {id=null}=req.params;
        let {departmentId=null,department=null,recordnum=null,fio=null,qualification=null,startdt=null,enddt=null} = req.body
        
        const teacher = await Teacher.findOne(
            {
                where: {id}
            },
        )
        
        if(!department){department={id:null}}
        if(!departmentId){departmentId=department.id}

        if (teacher){
            teacher.departmentId=departmentId
            teacher.recordnum=recordnum
            teacher.fio=fio
            teacher.qualification=qualification
            teacher.startdt=startdt
            teacher.enddt=enddt
            await teacher.save();
        }
        return res.json(teacher)
    } 
    async delete(req, res) {
        const {id=null} = req.params
        const teacher = await Teacher.destroy(
            {
                where: {id}
            },
        )

        return res.json({})
    } 
}

module.exports = new TeacherController()
