import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form,Row,Col} from "react-bootstrap";
import { connect } from "react-redux";
import { variables } from '../variables';
import useForm from '../components/useForm'
//
import * as actionsDepartment from "../actions/actionsDepartment";
//
import {TextField,Grid} from '@mui/material';


const initialFieldValues = {
    id: '',
    departmentcode:'',
    departmentnm:'',
    img:''
}


const ModalDepartment=({classes,show,onHide,modalTitle, ...props})=>{
const [validated, setValidated] = useState(false);

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
                props.createDepartment(values, onSuccess)
            else
                props.updateDepartment(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if ( // eslint-disable-next-line
            props.currentId != 0) {
            setValues({
                // eslint-disable-next-line
                ...props.DepartmentList.find(x => x.id == props.currentId)
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
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

 return (
    <Modal
            show={show}
            onHide={onHide}
            centered
            size='lg'
            {...props}
    >

   <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {modalTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form autoComplete="off" lg noValidate onSubmit={handleSubmit}>

            <Grid container spacing={2} xs={14} sm>

              <Grid item>
              <div className="p-2 w-50 bd-highlight">
                 <img width="150px" height="150px"
                 alt={values.img}
                 src={variables.PHOTO_URL+values.img}/>
                 <input className="m-2" type="file" onChange={imageUpload}/>
                </div> 
              </Grid> 
              
              <Grid item xs={14} sm container>
               <Grid item xs container direction="column" spacing={2}>
                <Grid item xs={3}>
                 <TextField
                  name="departmentcode"
                  variant="outlined"
                  label="Код"
                  value={values.departmentcode}
                  onChange={handleInputChange}
                  {...(errors.departmentcode && { error: true, helperText: errors.departmentcode })}
                  />
                </Grid>

                <Grid item xs={4} sm>
                 <TextField
                  name="departmentnm"
                  variant="outlined"                
                  label="Описание"
                  value={values.departmentnm}
                  onChange={handleInputChange} 
                  {...(errors.departmentnm && { error: true, helperText: errors.departmentnm })}
                 />
                </Grid>
              </Grid>

             </Grid>
            </Grid>
                
            </Form>
            </Modal.Body>
      <Modal.Footer>
       <div className="d-grid gap-2 d-flex flex-row">
        <Button variant="outline-danger" size="sm" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" size="sm" type="submit" onClick={handleSubmit}>Сохранить</Button>
       </div>
      </Modal.Footer>               
    </Modal>
 )   
}

const mapStateToProps = state => ({
    DepartmentList:state.Departments.list
})

const mapActionToProps = {
    createDepartment  : actionsDepartment.create,
    updateDepartment  : actionsDepartment.update
}

export default connect(mapStateToProps, mapActionToProps)(ModalDepartment);
