import { combineReducers } from 'redux'
import { reduceTeacher } from './reduceTeacher'
import { reduceStudent } from './reduceStudent'
import { reduceGroup } from './reduceGroup'
import { reduceFaculty } from './reduceFaculty'
import { reduceTerm } from './reduceTerm'
import { reduceDepartment } from './reduceDepartment'
import { reduceDiscipline } from './reduceDiscipline'

export const reducers = combineReducers({
  Teachers: reduceTeacher,
  Students: reduceStudent,
  Groups: reduceGroup,
  Faculties: reduceFaculty,
  Terms: reduceTerm,
  Departments: reduceDepartment,
  Disciplines: reduceDiscipline
})
