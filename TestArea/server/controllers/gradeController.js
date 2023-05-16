const {Grade,Student,Teacher,Department,Discipline} =require('../models/models')
const ApiError= require('../error/ApiError')

class GradeController {
    async create(req, res,next) {
        try{
        const {teacher=null,student=null,discipline=null,teacherId=null,studentId=null,disciplineId=null,gradeval} = req.body

        if(!teacher){teacher={id:null}}
        if(!student){student={id:null}}
        if(!discipline){discipline={id:null}}

        if(!teacherId){teacherId=teacher.id}
        if(!studentId){studentId=student.id}
        if(!disciplineId){disciplineId=discipline.id}

        const grade = await Grade.create({teacherId,studentId,disciplineId,gradeval})
        return res.json(grade)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const grades = await Grade.findAll(
          {  
            attributes: ['id', 'teacherId','studentId','disciplineId','gradeval'],
            include: [
                {
                  model: Student,
                  required: true,
                  attributes: ['id', 'recordnum','studentname','phone','img'],
                  include: [
                    {
                      model: Group,
                      required: true,
                      attributes: ['id', 'groupcode','groupnm']
                    }
                ]    
                },
                {
                  model: Discipline,
                  required: true,
                  attributes: ['id', 'disciplinecode','disciplinenm']
                },
                {
                  model:Teacher,
                  required: true,
                  attributes: ['id', 'recordnum','fio','qualification','startdt','enddt'],
                  include: [
                        {
                          model: Department,
                          required: false,
                          attributes: ['id', 'departmentcode','departmentnm']
                        }
                    ]                  
                }
  
            ]
        }
        )
        return res.json(grades)
    }
    async getById(req, res) {
        const {id} = req.params
        const grade = await Grade.findOne(
            {
                attributes: ['id', 'teacherId','studentId','disciplineId','gradeval'],
                include: [
                    {
                      model: Student,
                      required: true,
                      attributes: ['id', 'recordnum','studentname','phone','img']
                    },
                    {
                        model:Teacher,
                        required: true,
                        attributes: ['id', 'recordnum','fio','qualification','startdt','enddt'],
                        include: [
                            {
                              model: Department,
                              required: false,
                              attributes: ['id', 'departmentcode','departmentnm']
                            }
                        ]                  
                    }
      
                ],
                where: {id}
            },
        )
        return res.json(grade)
    }

    async put(req, res) {
        const {id=null}=req.params;
        const {teacher=null,student=null,discipline=null,teacherId=null,studentId=null,disciplineId=null,gradeval=null} = req.body

        const grade = await Grade.findOne(
            {
                where: {id}
            },
        )
        
        if (grade){

        if(!teacher){teacher={id:null}}
        if(!student){student={id:null}}
        if(!discipline){discipline={id:null}}

        if(!teacherId){teacherId=teacher.id}
        if(!studentId){studentId=student.id}
        if(!disciplineId){disciplineId=discipline.id}

        grade.teacherId=teacherId;
        grade.studentId=studentId;
        grade.disciplineId=disciplineId;
        grade.gradeval=gradeval;
        await grade.save();
        }
        return res.json(grade)
    } 
    async delete(req, res) {
        const {id=null} = req.params
        const grade = await Grade.destroy(
            {
                where: {id}
            },
        )

        return res.json({})
    } 
}

module.exports = new GradeController()
