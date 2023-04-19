import React,{Component} from 'react';
import {variables} from './variables';

export class Faculty extends Component{
    constructor(props){
        super(props);

        this.state={
            faculties:[],
            modalTitle:"",
            id:0,
            facultycode:"",
            facultynm:""
        }
    }

    refreshList(){
        fetch(variables.API_URL+'faculty')
        .then(response=>response.json())
        .then(data=>{
            this.setState({faculties:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeFacultyCode =(e)=>{
        this.setState({facultycode:e.target.value});
    }

    changeFacultyNm =(e)=>{
        this.setState({facultynm:e.target.value});
    }
 
    addClick(){
        this.setState({
            modalTitle:"Add Faculty",
            id:0,
            facultycode:"",
            facultynm:""
        });
    }

    editClick(fac){
        this.setState({
            modalTitle:"Edit Faculty",
            id:fac.id,
            facultycode:fac.facultycode,
            facultynm:fac.facultynm
        });
    }
 
    createClick(){
        fetch(variables.API_URL+'faculty',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                facultycode:this.state.facultycode
               ,facultynm:this.state.facultynm
            })
        })
        .then(res=>{
             this.refreshList();
             alert('Added Succesfully');
        })
    }
   
    updateClick(){
        fetch(variables.API_URL+'faculty/'+this.state.id,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                facultycode:this.state.facultycode,
                facultynm:this.state.facultynm
            })
        })
        .then(res=>{
            this.refreshList();
            alert('Updated Succesfully');
        })
    }
   
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'faculty/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>{
            this.refreshList();
            alert('Deleted Succesfully')
        })
      }
    }
   
    render(){
        const {
          faculties,
          modalTitle,
          id,
          facultycode,
          facultynm
         }=this.state;
   
        return(
            <div>
                <button type="button"
                 className="btn btn-primary m-2 float-end"
                 data-bs-toggle="modal"
                 data-bs-target="#exampleModal"
                 onClick={()=>this.addClick()}>
                 Add Faculty
                </button>

                <table className="table table-striped" >
                 <thead>
                  <tr>
                    <th>id</th>
                    <th>facultycode</th>
                    <th>facultynm</th>
                  </tr>
                 </thead>
                 <tbody>
                    {faculties.map(fac=>
                     <tr key={fac.id}>
                        <td>{fac.id}</td>
                        <td>{fac.facultycode}</td>
                        <td>{fac.facultynm}</td>
                        <td>
                            <button type ="button" className="btn btn-light mr-1"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={()=>this.editClick(fac)}
                            >

                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                               <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                             </svg>

                            </button>
                             <button type ="button" className="btn btn-light mr-1"
                              onClick={()=>this.deleteClick(fac.id)}
                             >

                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                             </svg>

                            </button>
                        </td>
                     </tr>
                     )
                    }
                 </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
       <div className="input-group mb-3">
        <span className="input-group-text">facultycode</span>
        <input type="text" className="form-control"
        value={facultycode}
        onChange={this.changeFacultyCode}/>
       </div>
       <div className="input-group mb-3">
        <span className="input-group-text">facultynm</span>
        <input type="text" className="form-control"
        value={facultynm}
        onChange={this.changeFacultyNm}/>
       </div>

        {id==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {id!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}

   </div>

</div>
</div> 
</div>

 
            </div>
        )
    }
}