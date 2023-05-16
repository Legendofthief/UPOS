const {Group}= require ('../models/models')
const {Faculty}= require ('../models/models')
const {Term}= require ('../models/models')
const ApiError= require('../error/ApiError')

class GroupController {
    async create(req, res,next) {
        try{
        let {faculty=null,term=null,facultyId=null,termId=null,groupcode=null,groupnm=null,qualification=null,startdt=null} = req.body

        if(!faculty){faculty={id:null}}
        if(!term){term={id:null}}

        if (!facultyId){faculty.Id=faculty.id}
        if(!termId){termId=term.id}
        const group = await Group.create({facultyId,termId,groupcode,groupnm,qualification,startdt})
        return res.json(group)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const groups = await Group.findAll(
            {
                attributes: ['id','facultyId','termId','groupcode','groupnm','qualification','startdt'],
                include: [
                    {
                      model: Faculty,
                      required: false,
                      attributes: ['id', 'facultycode','facultynm']
                    },
                    {
                        model: Term,
                        required: false,
                        attributes: ['id', 'termcode','termtype','termqnt']
                    }
                ]
            }
        )
        return res.json(groups)
    }

    async getById(req, res) {
        const {id} = req.params

        const group = await Group.findOne(
            {
                attributes: ['id','facultyId','termId','groupcode','groupnm','qualification','startdt'],
                include: [
                    {
                      model: Faculty,
                      required: false,
                      attributes: ['id', 'facultycode','facultynm']
                    },
                    {
                        model: Term,
                        required: false,
                        attributes: ['id', 'termcode','termtype','termqnt']
                    }
                ],
                where: {id}
            },
        )
        return res.json(group)
    }

    async put(req, res) {
        const {id=null}=req.params;
        let {faculty=null,term=null,facultyId=null,termId=null,groupcode,groupnm,qualification=null,startdt} = req.body

        const group = await Group.findOne(
            {
                where: {id}
            },
        )
        
        if (group){
            if(!faculty){faculty={id:null}}
            if(!term){term={id:null}}

            if(!facultyId){facultyId=faculty.id}
            if(!termId){termId=term.id}

            group.facultyId= facultyId
            group.termId= termId
            group.groupcode= groupcode
            group.groupnm= groupnm
            group.qualification= qualification
            group.startdt= startdt
            await group.save();
        }
        return res.json(group)
    } 
    async delete(req, res) {
        const {id=null} = req.params
        const group = await Group.destroy(
            {
                where: {id}
            },
        )

        return res.json({})
    } 

}

module.exports = new GroupController()
