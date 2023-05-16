import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form,Row,Col} from "react-bootstrap";
import { connect } from "react-redux";
import useForm from '../components/useForm'
//
import * as actionsDiscipline from "../actions/actionsDiscipline";
//
import {TextField,Grid} from '@mui/material';


const initialFieldValues = {
    id: '',
    disciplinecode:'',
    disciplinenm:''
}


const ModalDiscipline=({classes,show,onHide,modalTitle, ...props})=>{
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
                props.createDiscipline(values, onSuccess)
            else
                props.updateDiscipline(props.currentId, values, onSuccess)

            props.setCurrentId(-1)    
        }
    }

    useEffect(() => {
        if ( // eslint-disable-next-line
            props.currentId != 0) {
            setValues({
                // eslint-disable-next-line
                ...props.DisciplineList.find(x => x.id == props.currentId)
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
             
              <Grid item xs={14} sm container>
               <Grid item xs container direction="column" spacing={2}>
                <Grid item xs={3}>
                 <TextField
                  name="disciplinecode"
                  variant="outlined"
                  label="Код"
                  value={values.disciplinecode}
                  onChange={handleInputChange}
                  {...(errors.disciplinecode && { error: true, helperText: errors.disciplinecode })}
                  />
                </Grid>

                <Grid item xs={4} sm>
                 <TextField
                  name="disciplinenm"
                  variant="outlined"                
                  label="Описание"
                  value={values.disciplinenm}
                  onChange={handleInputChange} 
                  {...(errors.disciplinenm && { error: true, helperText: errors.disciplinenm })}
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
    DisciplineList:state.Disciplines.list
})

const mapActionToProps = {
    createDiscipline  : actionsDiscipline.create,
    updateDiscipline  : actionsDiscipline.update
}

export default connect(mapStateToProps, mapActionToProps)(ModalDiscipline);
