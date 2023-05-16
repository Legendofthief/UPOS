import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import { connect } from "react-redux";
import useForm from '../components/useForm'
//
import * as actionsGroup from "../actions/actionsGroup";
import * as actionsFaculty from '../actions/actionsFaculty'
import * as actionsTerm from '../actions/actionsTerm'


const initialFieldValues = {
        id:'',
        facultyId:'',
        groupcode:'',
        groupnm:'',
        qualification:'',
        startdt:'',
        faculty:{
            id:'',
            facultycode:'',
            facultynm:''  
           },
        term:{
            id:'',
            termcode:'',
            termtype:'',
            termqnt:''
        }
}

const ModalGroup=({classes,show,onHide,modalTitle,...props})=>{
const [validated, setValidated] = useState(false);
const [Faculties,setFaculties]=useState([{}])
const [Terms,setTerms]=useState([{}])

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
      props.fetchAllFaculties()
      setFaculties(props.FacultyList)
      props.fetchAllTerms()
      setTerms(props.TermList)
    },[props.currentId])


    const ChangeFaculty=(record)=>{
      setValues(
        {
         ...values,
         facultyId:record.id,
         faculty  :record
        }
      )
    }

    const ChangeTerm=(record)=>{
      setValues(
        {
         ...values,
         termId:record.id,
         term  :record
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
                props.createGroup(values, onSuccess)
                }
            else
                props.updateGroup(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if ( // eslint-disable-next-line
            props.currentId != 0) {
            setValues({
                // eslint-disable-next-line
                ...props.GroupList.find(x => x.id == props.currentId)
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

            <Form.Group as={Row} controlId="formstudent">

            <Dropdown className="mt-2 mb-2">
             <Form.Label column sm="2">Факультет</Form.Label>    
             <Dropdown.Toggle>{values?.faculty?.facultycode+' '+values?.faculty?.facultynm || "Выберите Факультет"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {
                 Faculties.map
                 (
                  record =>
                  <Dropdown.Item
                    name="groupId"
                    onClick={()=>ChangeFaculty(record)}
                    value = {values?.facultyId}
                    options key={record.id}
                    >
                    {
                      record.facultycode+' '+record.facultynm
                    }
                  </Dropdown.Item>
                 )
                }
             </Dropdown.Menu>
            </Dropdown>


            <Dropdown className="mt-2 mb-2">
             <Form.Label column sm="2">Длительность</Form.Label>    
             <Dropdown.Toggle>{values?.term?.termcode || "Выберите длительность"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {
                 Terms.map
                 (
                  record =>
                  <Dropdown.Item
                    name="termId"
                    onClick={()=>ChangeTerm(record)}
                    value = {values?.termId}
                    options key={record.id}
                    >
                    {
                      record.termcode+'/'+record.termtype+record.termqnt
                    }
                  </Dropdown.Item>
                 )
                }
             </Dropdown.Menu>
            </Dropdown>

             <Form.Group as={Row} controlId="formgroupcode">
               <Form.Label column sm="2">Код</Form.Label>
               <Col sm="10">
               <Form.Control
                name="groupcode"
                type="text" 
                placeholder="Код"
                value={values.groupcode}
                onChange={handleInputChange} 
               />
              </Col>
             </Form.Group>

             <Form.Group as={Row} controlId="formgroupnm">
               <Form.Label column sm="2">Описание</Form.Label>
               <Col sm="10">
               <Form.Control
                name="groupnm"
                type="text" 
                placeholder="Описание"
                value={values.groupnm}
                onChange={handleInputChange} 
               />
              </Col>
             </Form.Group>

             <Form.Group as={Row} controlId="formgroupqualification">
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

             <Form.Group as={Row} controlId="formgroupstartdt">
               <Form.Label column sm="2">Образована</Form.Label>
               <Col sm="10">
               <Form.Control
                name="startdt"
                type="date" 
                placeholder="Дата образования"
                value={values.startdt}
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
    GroupList   :state.Groups.list,
    FacultyList :state.Faculties.list,
    TermList    :state.Terms.list
})

const mapActionToProps = {
    createGroup  : actionsGroup.create,
    updateGroup  : actionsGroup.update,
    fetchAllFaculties:actionsFaculty.fetchAll,
    fetchAllTerms    :actionsTerm.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(ModalGroup);
