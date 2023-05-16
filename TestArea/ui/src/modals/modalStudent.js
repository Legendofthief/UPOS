import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import { connect } from "react-redux";
import { variables } from '../variables';
import useForm from '../components/useForm'
//
import * as actionsGroup from "../actions/actionsGroup";
import * as actionsStudent from "../actions/actionsStudent";

const initialFieldValues = {
    id: '',
    groupId:'',
    recordnum: '',
    studentname: '',
    phone: '',
    img: '',
    group:{
        id:'',
        groupcode:'',
        groupnm:'',
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
}

const ModalStudent=({classes,show,onHide,modalTitle, ...props})=>{
const [validated, setValidated] = useState(false);
const [Groups,setGroups]=useState([{}])

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
      props.fetchAllGroups();
      setGroups(props.GroupList)
    },[props.currentId])

    const imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("img",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
          setValues({ 
            ...values,
            img:data.img
          })
         }
        )  
    }

    const ChangeGroup=(record)=>{
      setValues(
        {
        ...values,
        groupId:record.id,
        group  :record
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
                props.currentId == 0)
                props.createStudent(values, onSuccess)
            else
                props.updateStudent(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if ( // eslint-disable-next-line
            props.currentId != 0) {
            setValues({
                // eslint-disable-next-line
                ...props.StudentList.find(x => x.id == props.currentId)
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
             <Form.Label column sm="2">Группа</Form.Label>    
             <Dropdown.Toggle>{values?.group?.groupcode+' '+values?.group?.groupnm+' '+ values?.group?.faculty?.facultycode || "Выберите группу"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {
                 Groups.map
                 (
                  record =>
                  <Dropdown.Item
                    name="groupId"
                    onClick={()=>ChangeGroup(record)}
                    value = {values?.groupId}
                    options key={record.id}
                    >
                    {
                      record.groupcode+'/'+record.groupnm+'/'+record?.faculty?.facultycode
                    }
                  </Dropdown.Item>
                 )
                }
             </Dropdown.Menu>
            </Dropdown>


             <Form.Group as={Row} controlId="formstudentrecord">
               <Form.Label column sm="2">Номер</Form.Label>
               <Col sm="10">
               <Form.Control
                name="recordnum"
                type="text" 
                placeholder="Номер"
                value={values.recordnum}
                onChange={handleInputChange} 
               />
              </Col>
             </Form.Group>

             <Form.Group as={Row} controlId="formstudentname">
               <Form.Label column sm="2">ФИО</Form.Label>
               <Col sm="10">
               <Form.Control
                name="studentname"
                type="text" 
                placeholder="ФИО"
                value={values.studentname}
                onChange={handleInputChange} 
               />
              </Col>
             </Form.Group>

             <Form.Group as={Row} controlId="formstudentname">
               <Form.Label column sm="2">Телефон</Form.Label>
               <Col sm="10">
               <Form.Control
                name="phone"
                type="text" 
                placeholder="Телефон"
                value={values.phone}
                onChange={handleInputChange} 
               />
              </Col>
             </Form.Group>

            </Form.Group>
            </div>

            <Form.Group>
              <div className="w-20 bd-highlight">
                <img width="120px" height="120px"
                alt="Фото"
                src={variables.PHOTO_URL+values.img}/>
                <input className="m-2" type="file" onChange={imageUpload}/>
              </div>
             </Form.Group>

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
    StudentList:state.Students.list,
    GroupList  :state.Groups.list
})

const mapActionToProps = {
    createStudent  : actionsStudent.create,
    updateStudent  : actionsStudent.update,
    fetchAllGroups : actionsGroup.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(ModalStudent);
