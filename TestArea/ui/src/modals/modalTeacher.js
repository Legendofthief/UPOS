import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import { connect } from "react-redux";
import useForm from '../components/useForm'
//
import * as actionsTeacher from "../actions/actionsTeacher";
import * as actionsDepartment from '../actions/actionsDepartment'

const initialFieldValues = {
        id:'',
        departmentId:'',
        recordnum:'',
        fio:'',
        qualification:'',
        startdt:'',
        enddt:'',
        department:{
            id:'',
            departmentcode:'',
            departmentnm:''  
           }
}

const ModalGroup=({classes,show,onHide,modalTitle,...props})=>{
const [validated, setValidated] = useState(false);
const [Departments,setDepartments]=useState([{}])

    const addToast=(message,{options})=>{
        alert(message)
       }
      
    const validate = (fieldValues = values) => {

        let temp = { ...errors }

        setErrors({
            ...temp
        })
        
        if (
            // eslint-disable-next-line
             fieldValues == values
           )
        // eslint-disable-next-line
            return Object.values(temp).every(x => x == "")
    }

    useEffect(()=>{
      props.fetchAllDepartments()
      setDepartments(props.DepartmentList)
    },[props.currentId])


    const ChangeDepartment=(record)=>{
      setValues(
        {
         ...values,
         departmentId:record.id,
         department  :record
        }
      )
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            setValidated(true);

            const onSuccess = () => {
               addToast("Изменение внесено", { appearance: 'success' })
               onHide()
               resetForm();
            }

            if (// eslint-disable-next-line
                props.currentId <= 0){
                props.createTeacher(values, onSuccess)
                alert(values.recordnum)
                }
            else
                props.updateTeacher(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if ( // eslint-disable-next-line
            props.currentId != 0) {
            setValues({
                // eslint-disable-next-line
                ...props.TeacherList.find(x => x.id == props.currentId)
            })
            //react-hooks/exhaustive-deps
           setErrors({})
        }
    },[props.currentId])

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        UpdateField
    } = useForm(initialFieldValues, validate, props.setCurrentId)

 return (
    <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
            
    >

   <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {modalTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

            <div className="d-flex flex-row bd-highlight">

            <div className="bd-highlight">

            <Form.Group as={Row} controlId="formteaacher">

            <Dropdown className="mt-2 mb-2">
             <Form.Label column sm="2">Кафедра</Form.Label>    
             <Dropdown.Toggle>{values?.department?.departmentcode+' '+values?.department?.departmentnm || "Выберите Факультет"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {
                 Departments.map
                 (
                  record =>
                  <Dropdown.Item
                    name="departmentId"
                    onClick={()=>ChangeDepartment(record)}
                    value = {values?.departmentId}
                    options key={record.id}
                    >
                    {
                      record.departmentcode+' '+record.departmentnm
                    }
                  </Dropdown.Item>
                 )
                }
             </Dropdown.Menu>
            </Dropdown>

             <Form.Group as={Row} controlId="formteacherrecordnum">
               <Form.Label column sm="2">Код</Form.Label>
               <Col sm="10">
               <Form.Control
                name="recordnum"
                type="text" 
                placeholder="Код"
                value={values.recordnum}
                onChange={handleInputChange} 
               />
              </Col>
             </Form.Group>

             <Form.Group as={Row} controlId="formteacherfio">
               <Form.Label column sm="2">Описание</Form.Label>
               <Col sm="10">
               <Form.Control
                name="fio"
                type="text" 
                placeholder="ФИО"
                value={values.fio}
                onChange={handleInputChange} 
               />
              </Col>
             </Form.Group>

             <Form.Group as={Row} controlId="formgteacherqualification">
               <Form.Label column sm="2">Квалификация</Form.Label>
               <Col sm="10">
               <Form.Control
                name="qualification"
                type="text" 
                placeholder="Квалификация"
                value={values.qualification}
                onChange={handleInputChange} 
               />
              </Col>
             </Form.Group>

             <Form.Group as={Row} controlId="formteacherstartdt">
               <Form.Label column sm="2">Принят</Form.Label>
               <Col sm="10">
               <Form.Control
                name="startdt"
                type="date" 
                placeholder="Дата принятия"
                value={values.startdt}
                onChange={handleInputChange} 
               />
              </Col>
             </Form.Group>

             <Form.Group as={Row} controlId="formteacherenddt">
               <Form.Label column sm="2">Завершено</Form.Label>
               <Col sm="10">
               <Form.Control
                name="enddt"
                type="date" 
                placeholder="Дата завершения"
                value={values.enddt}
                onChange={handleInputChange} 
               />
              </Col>
             </Form.Group>

            </Form.Group>
            </div>

             </div>

            </Form>
            </Modal.Body>
      <Modal.Footer>
       <div className="d-grid gap-2 d-flex flex-row">
        <Button variant="outline-danger" size="sm" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" size="sm" type="submit" onClick={handleSubmit} >Сохранить</Button>
       </div>
      </Modal.Footer>               
    </Modal>
 )   
}

const mapStateToProps = state => ({
    TeacherList   :state.Teachers.list,
    DepartmentList :state.Departments.list
})

const mapActionToProps = {
    createTeacher      : actionsTeacher.create,
    updateTeacher      : actionsTeacher.update,
    fetchAllDepartments: actionsDepartment.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(ModalGroup);
