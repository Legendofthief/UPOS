const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Department = sequelize.define(
  'department',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    departmentcode: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false
    },
    departmentnm: { type: DataTypes.STRING(100), allowNull: false },
    img: { type: DataTypes.STRING, allowNull: true }
  },
  {
    schema: process.env.DB_SCHEMA,
    freezeTableName: true,
    tableName: 'department'
  }
)

const Faculty = sequelize.define(
  'faculty',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    facultycode: { type: DataTypes.STRING(10), unique: true, allowNull: false },
    facultynm: { type: DataTypes.STRING(100), allowNull: false }
  },
  {
    schema: process.env.DB_SCHEMA,
    freezeTableName: true,
    tableName: 'faculty'
  }
)

const Term = sequelize.define(
  'term',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    termcode: { type: DataTypes.STRING(10), unique: true, allowNull: false },
    termtype: { type: DataTypes.STRING(1), allowNull: false },
    termqnt: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    schema: process.env.DB_SCHEMA,
    freezeTableName: true,
    tableName: 'term'
  }
)

const Teacher = sequelize.define(
  'teacher',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Department,
        key: 'id'
      }
    },
    recordnum: { type: DataTypes.STRING(50), unique: true, allowNull: false },
    fio: { type: DataTypes.STRING(100) },
    qualification: { type: DataTypes.STRING(50) },
    startdt: { type: DataTypes.DATEONLY,  allowNull: false },
    enddt: { type: DataTypes.DATEONLY  }
  },
  {
    schema: process.env.DB_SCHEMA,
    freezeTableName: true,
    tableName: 'teacher'
  }
)

const Group = sequelize.define(
  'group',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    facultyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Faculty,
        key: 'id'
      }
    },
    termId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Term,
        key: 'id'
      }
    },
    groupcode: { type: DataTypes.STRING(10), unique: true, allowNull: false },
    groupnm: { type: DataTypes.STRING(100) },
    qualification: { type: DataTypes.INTEGER },
    startdt: { type: DataTypes.DATEONLY, allowNull: false }
  },
  {
    schema: process.env.DB_SCHEMA,
    freezeTableName: true,
    tableName: 'group'
  }
)
const Student = sequelize.define(
  'student',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Group,
        key: 'id'
      }
    },
    recordnum: { type: DataTypes.STRING(50), unique: true, allowNull: false },
    studentname: { type: DataTypes.STRING(100), allowNull: false },
    phone: { type: DataTypes.STRING(30) },
    img: { type: DataTypes.STRING(4000) }
  },
  {
    schema: process.env.DB_SCHEMA,
    freezeTableName: true,
    tableName: 'student'
  }
)

const Discipline = sequelize.define(
  'discipline',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    disciplinecode: { type: DataTypes.STRING(50),allowNull: false },
    disciplinenm: { type: DataTypes.STRING(100),allowNull: false }
  },
  {
    schema: process.env.DB_SCHEMA,
    freezeTableName: true,
    tableName: 'discipline'
  }
)

const Grade = sequelize.define(
  'grade',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teacher,
        key: 'id'
      }
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: 'id'
      }
    },
    disciplineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Discipline,
        key: 'id'
      }
    },
    gradeval: { type: DataTypes.INTEGER,allowNull: false  }
  },
  {
    schema: process.env.DB_SCHEMA,
    freezeTableName: true,
    tableName: 'grade'
  }
)

const TeacherGroupDiscipline = sequelize.define(
  'teachergroupdiscipline',
  {
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Teacher,
        key: 'id'
      }
    },
    disciplineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Discipline,
        key: 'id'
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Group,
        key: 'id'
      }
    },
    hourscount: {type: DataTypes.INTEGER,allowNull: false}
  },
  {
    schema: process.env.DB_SCHEMA,
    freezeTableName: true,
    tableName: 'teachergroupdiscipline',
    timestamps: false
  }
)

const TeacherDiscipline = sequelize.define(
  'teacherdiscipline',
  {
  },
  {
    schema: process.env.DB_SCHEMA,
    freezeTableName: true,
    tableName: 'teacherdiscipline',
    timestamps: false
  }
)

// //////////////////////////

Department.hasMany(Teacher)
Teacher.belongsTo(Department,
  {
    foreignKey: {
      name: 'departmentId'
    }
  }
)

Faculty.hasMany(Group)
Group.belongsTo(Faculty ,
  {
    foreignKey: {
      name: 'facultyId'
    }
  }
)

Term.hasMany(Group)
Group.belongsTo(Term ,
  {
    foreignKey: {
      name: 'termId'
    }
  }
)

Group.hasMany(Student)
Student.belongsTo(Group ,
  {
    foreignKey: {
      name: 'groupId'
    }
  }
)

Student.hasMany(Grade)
Grade.belongsTo(Student ,
  {
    foreignKey: {
      name: 'studentId'
    }
  }
)

Teacher.hasMany(Grade)
Grade.belongsTo(Teacher,
  {
    foreignKey: {
      name: 'teacherId'
    }
  }
)

Discipline.hasMany(Grade)
Grade.belongsTo(Discipline,
  {
    foreignKey: {
      name: 'disciplineId'
    }
  }
)

Teacher.hasMany(TeacherGroupDiscipline)
TeacherGroupDiscipline.belongsTo(Teacher,
  {
    foreignKey: {
      name: 'teacherId'
    }
  }
)

Discipline.hasMany(TeacherGroupDiscipline)
TeacherGroupDiscipline.belongsTo(Discipline,
  {
    foreignKey: {
      name: 'disciplineId'
    }
  }
)

Group.hasMany(TeacherGroupDiscipline)
TeacherGroupDiscipline.belongsTo(Group,
  {
    foreignKey: {
      name: 'groupId'
    }
  }
)

Teacher.belongsToMany(Discipline, { through: TeacherDiscipline,foreignKey: {name: 'disciplineId'}})
Discipline.belongsToMany(Teacher, { through: TeacherDiscipline,foreignKey: {name: 'teacherId'}})

//
module.exports = {
  Department,
  Faculty,
  Term,
  Teacher,
  Group,
  Student,
  Discipline,
  Grade,
TeacherGroupDiscipline}
