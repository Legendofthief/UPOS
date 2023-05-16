const {Student,Group,Term,Faculty}=require('../models/models')
const ApiError= require('../error/ApiError')
//const {getImgs} =  require('./utls');

class StudentController {
    async create(req, res,next) {
        try{
        let {groupId=null,group=null,recordnum,studentname,phone=null,img=null} = req.body

        if(!group){group={id:null}}
        if(!groupId){groupId=group.id}

        const student = await Student.create({groupId:groupId,recordnum,studentname,phone,img})
        return res.json(student)
    }
    catch (e) {
        next(ApiError.badRequest(e.message))
    }
}

    async getAll(req, res) {
        const students = await Student.findAll(
            {
                attributes: ['id','groupId', 'recordnum','studentname','phone','img'],
                include: [
                    {
                      model: Group,
                      required: false,
                      attributes: ['id', 'groupcode','groupnm'],
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
                ]
            }
        )
        return res.json(students)
    }

    async getById(req, res) {
        const {id} = req.params
        const student = await Student.findOne(
            {
                attributes: ['id','groupId','recordnum','studentname','phone','img'],
                include: [
                        {
                          model: Group,
                          required: false,
                          attributes: ['id', 'groupcode','groupnm'],
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
                ],
                    where: {id}
                }
        )
        return res.json(student)
    }

    async put(req, res) {
        const {id=null}=req.params;
        let {groupId=null,group,recordnum,studentname,phone=null,img=null} = req.body

        if(!group){group={id:null}}
        if(!groupId){groupId=group.id}

        const student = await Student.findOne(
            {
                where: {id}
            },
        )
        
        if (student){
            student.groupId= groupId;
            student.recordnum= recordnum;
            student.studentname= studentname;
            student.phone= phone;
            student.img=img;

        await student.save();
        }
        return res.json(student)
    } 
    async delete(req, res) {
        const {id=null} = req.params
        const student = await Student.destroy(
            {
                where: {id}
            },
        )

        return res.json({})
    } 

}

module.exports = new StudentController()
