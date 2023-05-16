const {Department} = require('../models/models')
const ApiError = require ('../error/ApiError')
const {getImgs} =  require('./utls');

class DepartmentController {
    async create(req, res,next) {
        try{
        let {departmentcode,departmentnm,img} = req.body
        const department = await Department.create({departmentcode,departmentnm,img});
        return res.json(department)
    }
    catch (e) {
        next(ApiError.badRequest(e.message))
    }
 }

    async getAll(req, res) {
        const departments = await Department.findAll({
            attributes: ['id', 'departmentcode','departmentnm','img']
        })
        return res.json(departments)
    }

    async getById(req, res) {
        const {id} = req.params

        const department = await Department.findOne(
            {
                attributes: ['id', 'departmentcode','departmentnm','img'],
                where: {id}
            }
        )
        return res.json(department)
    }

    async put(req, res) {
        const {id=null}=req.params;
        const {departmentcode=null,departmentnm=null,img=null} = req.body

        const department = await Department.findOne(
            {
                where: {id}
            },
        )

        if (department){
        department.departmentcode=departmentcode;
        department.departmentnm=departmentnm;
        department.img=img;

        await department.save();
        }
        return res.json(department)
    } 
    async delete(req, res) {
        const {id=null} = req.params
        const department = await Department.destroy(
            {
                where: {id}
            },
        )

        return res.json({})
    } 
 }

module.exports = new DepartmentController()
