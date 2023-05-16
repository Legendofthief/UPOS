import React, { useState, useEffect } from "react";
import {Button, Container} from "react-bootstrap";
import { connect } from "react-redux";
import * as actionsStudent from "../actions/actionsStudent";
import ModalStudent from '../modals/modalStudent'

const StudentForm = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    const [ModalStudentVisible, setModalStudentVisible] = useState(false)

    useEffect(() => {
        props.fetchAllStudents()
    }, [ModalStudentVisible])//componentDidMount

    const addToast=(message,{options})=>{
     alert(message)
    }

 
    const onDelete = id => {
        if (window.confirm('Уверены ?'))
            props.deleteStudent(id,()=>addToast("Запись удалена", { appearance: 'info' }))
    }

    const OnAddStudent=()=>{
      setCurrentId(0);
      setModalStudentVisible(true)
    }  
   
return(
  <div>
   <button type="button"
   className="btn btn-primary m-2 float-end"
   onClick={()=>OnAddStudent()}>
   Добавить
  </button>

    <Container className="d-flex flex-column">
    <table className="table table-striped" >
     <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Группа</th>
        <th>Факультет</th>
        <th>Описание факультета</th>
      </tr>
     </thead>
     <tbody>
        {props.StudentList.map(record=>
         <tr key={record.id}>
            <td>{record.recordnum}</td>
            <td>{record.studentname}</td>
            <td>{record.phone}</td>
            <td>{record?.group?.groupcode}</td>
            <td>{record?.group?.faculty?.facultycode}</td>
            <td>{record?.group?.faculty?.facultynm}</td>

            <td>
                         <div class="btn-toolbar">
                            <Button
                              className="btn-light mr-1"
                              onClick={()=>{setCurrentId(record.id);setModalStudentVisible(true) }}
                            >

                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                               <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                             </svg>

                            </Button>
                            
                            <Button className="btn btn-light mr-1"
                              onClick={()=>onDelete(record.id)}
                             >

                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                             </svg>

                            </Button>
                         </div>
                        </td>


         </tr>
         )
        }
     </tbody>
    </table>

    <ModalStudent 
    show={ModalStudentVisible} 
    onHide={() => setModalStudentVisible(false)}
    modalTitle="Редактор"
    {...{ currentId, setCurrentId }}
    />

</Container>
</div>
)
}


const mapStateToProps = state => ({
    StudentList: state.Students.list
})

const mapActionToProps = {
    fetchAllStudents: actionsStudent.fetchAll,
    deleteStudent: actionsStudent.Delete
}

export default (
    connect(mapStateToProps, mapActionToProps)(StudentForm)
 ) ;
