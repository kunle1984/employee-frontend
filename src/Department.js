import React, { useState, useEffect } from 'react'
import Navigation from './Navigation';
import EmployeeApi from './EmployeeApi'

export default function Department() {
const [departments, setDepartments]=useState([])
const [departmentName, setDepartmentName]=useState('')
const [department, setDepartment]=useState('')
const [id, setId]=useState()


//const [title, setTitle]=useState([])
useEffect(()=>{
EmployeeApi.getDepartments(setDepartments)
  
}, [])
const reload=()=>{
  EmployeeApi.getDepartments(setDepartments)
}
const addBtn=()=>{
  EmployeeApi.addDepartments({DepartmentName:departmentName})
.then(res=>console.log(res))
.then(alert('Department Added Successfully'))
.then(()=>reload())
  
} 



const editBtn=()=>{
  EmployeeApi.updateDepartments({DepartmentName:department}, id)
  .then(res=>console.log(res))
  .then(()=>reload())


}
function editClick(id, dep){
  setId(id)
  setDepartment(dep)
 
}
 const handleChange=((e)=>{
  setDepartment(e.target.value)
  
 })
const addClick=(()=>{
  setDepartment('')
})
 const deleteBtn=((id)=>{
  if (window.confirm('Are you sure?')){
EmployeeApi.deleteDepartments(id)
.then(()=>reload())
.then(console.log('Deleted'))



 }

})


  return (
    <div>


 <div className='container'>
 <Navigation/>
        <button class="btn btn-outline-primary mt-2 float-right " data-bs-toggle='modal' onClick={addClick} data-bs-target='#departmentadd'>Add Department</button>
        
    <table className='table table-striped '>
            <thead>
              <th>Department ID</th>
              <th>Department Name</th>
              <th>Options</th>
            
            </thead>
            <tbody>
           
              {
               departments && departments.map((dep)=>
                <tr key={dep.DepartmentId}>
                 <td>{dep.DepartmentId}</td>
                 <td>{dep.DepartmentName}</td> 
                 <td>
                
                 <button type='button' onClick={()=>editClick(dep.DepartmentId, dep.DepartmentName)} className='btn btn-primary mr-1' data-bs-toggle='modal' data-bs-target='#departmentedit'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>

                 </button>
                 <button type='button' className='btn btn-primary mx-3'  onClick={()=>deleteBtn(dep.DepartmentId)} >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fillRrule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
                 </button>
                 </td>
                 </tr>

                )
              }

            </tbody>
          </table>
          <div className="modal fade" id="departmentedit" tabindex="-1" aria-labelledby="department" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="department">Edit Department</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="input-group mb-3">
              <span class="input-group-text">Department</span>
              
               <input value={department} className="form-control" id="recipient-name" onChange={handleChange}/>
            </div>
            
          </form>
        </div>
        <div class="modal-footer">
        
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         <button  onClick={editBtn} type="button" class="btn btn-primary"  data-bs-dismiss="modal">Edit department</button>
         
         </div>
        </div>
      </div>
    </div>
  </div>



 <div className="modal fade" id="departmentadd" tabindex="-1" aria-labelledby="department" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="department">Add Department</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="input-group mb-3">
            <span class="input-group-text">Department</span>
              
               <input value={departmentName} className="form-control"  onChange={e=>setDepartmentName(e.target.value)}/>
            </div>
            
          </form>
        </div>
        <div class="modal-footer">
        
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         
          <button  onClick={addBtn} type="button" class="btn btn-primary"  data-bs-dismiss="modal">Add department</button>
         
        </div>
      </div>
    </div>
  </div>

          
          </div>
  )
}
