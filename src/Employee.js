import React, { useState, useEffect } from 'react'
import { variable } from "./Variable";
import EmployeeApi from './EmployeeApi';
import {useCookies} from 'react-cookie' ;
import Navigation from './Navigation';
import moment from "moment";
import Pagination from './Pagination';



export default function Employees() {
const [employees, setEmployees]=useState([])
const [departments, setDepartments]=useState([])

const [employeeName, setEmployeeName]=useState('')
const [department, setDepartment]=useState()
const [phone, setPhone]=useState()
const [salary, setSalary]=useState()
const [email, setEmail]=useState()
const [datejoining, setDatejoing]=useState('')
const [photoname, setPhotoname]=useState('signature.jpeg')
const [id, setId]=useState()
const [value, setValue]=useState('')
const [sortvalue, setSortvalue]=useState('')
const [token]=useCookies(['mytoken'])


// User is currently on this page
const [currentPage, setCurrentPage] = useState(1);
// No of Records to be displayed on each page   
const [recordsPerPage] = useState(10);

const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const nPages = Math.ceil(employees.length / recordsPerPage)

const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

const nextPage = () => {
  if(currentPage !== nPages) 
      setCurrentPage(currentPage + 1)
}

const prevPage = () => {
  if(currentPage !== 1) 
      setCurrentPage(currentPage - 1)
}


useEffect(()=>{
  EmployeeApi.getDepartments(setDepartments)
  .then(res=>res)
     
  }, [])
useEffect(()=>{
 
EmployeeApi.getEmployees(setEmployees)

 
}, [])


const addBtn=()=>{
  EmployeeApi.addEmployees({EmployeeName:employeeName,Department:department, Phone:phone, Email:email, 
     Datejoining:datejoining, Salary:salary,Photo:photoname})
.then(res=>console.log(res))
.then(()=>reload())
.then(alert('Employee Added Successfully'))
  
} 


const reload=()=>{
  EmployeeApi.getEmployees(setEmployees)
}
const editBtn=()=>{
  EmployeeApi.updateEmployees({EmployeeName:employeeName,Department:department, Phone:phone, Email:email, 
    Datejoining:datejoining,Salary:salary,Photo:photoname}, id)
    .then(()=>reload())
    .then(alert('Employee Updated Successfully'))
 


}
function editClick(id, emp, dept, datejoining,photo, phone,email, salary){
  setId(id);
  setEmployeeName(emp);
  setDepartment(dept);
  setDatejoing(datejoining);
  setPhotoname(photo);
  setPhone(phone);
  setEmail(email);
  setSalary(salary);

 
}
 
const addClick=(()=>{
  setId();
  setEmployeeName('');
  setDepartment('');
  setDatejoing('');
  setPhone('');
  setEmail('');
  setSalary('');
  setPhotoname('signature.jpeg');
 
})
 const deleteBtn=((id)=>{
  if (window.confirm('Are you sure?')){
EmployeeApi.deleteEmployee(id)
.then(()=>reload())

 }

})
const uploadImage=(e)=>{
  e.preventDefault();
  const formData=new FormData()
  formData.append('file', e.target.files[0], e.target.files[0].name)
  fetch(variable.API_URL+'employee/savefile',{
    method:'POST',
    body:formData
  }).then(res=>res.json())
  .then(res=>setPhotoname(res))
  
  .then(res=>console.log(res))
}


const handleSearch=async(e)=>{
  e.preventDefault();
  setValue(e.target.value)
return await fetch(variable.API_URL+`employeefilter/${value}`,
  {
    'method':'GET',
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json',
    }
})
.then(res=>res.json())
.then((res)=>{
  setEmployees(res)
 
})
.then((res)=>console.log(res))
.then((err)=>console.log(err))

}



const handleSort=async(e)=>{
  let sortparam=e.target.value
  setSortvalue(sortparam)
  return await fetch(variable.API_URL+`employeeorder/${sortparam}`,
  {
    'method':'GET',
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json',
    }
})
.then(res=>res.json())
.then((res)=>{
  setEmployees(res)
  setSortvalue('')
})
.then((res)=>console.log(res))
.then((err)=>console.log(err))
  
}


const sortOptions=['EmployeeName', 'Department', 'Phone', 'Email']

  return (
    <div>

  <div className='container'>
  <Navigation/>
      <div className='row my-3'>
        
            <div className='col-md-3'>
              <form  method="get">
            <div className="input-group">
              
              <input type="text"  name="q" className='form-control' placeholder='search.....' value={value} 
              onChange={handleSearch}/>
          
             
              </div>
              </form>
             
            </div>
            <div className='col-md-3'>
        <div className="input-group mb-3">
              <span className="input-group-text">Sort</span>
              <select  className='form-select w-20'  value={sortvalue} onChange={handleSort} >
              <option >Please select</option>
              {sortOptions.map((item, index)=>(
                <option key={index} value={item}>{item}</option>
              )
              
              )}
 

              </select>
              </div>
            </div>
            <div className='col-md-3'>
            <button className='btn btn-outline-primary' onClick={()=>reload()} >Reset</button>
            </div>
            <div className='col-md-3 '>
         
            <button class="btn btn-outline-primary  " data-bs-toggle='modal' onClick={addClick} data-bs-target='#departmentadd'>Add Employee</button>
            
        </div>
        
      </div>

       
      
    <table className='table table-striped '>
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Department Name</th>
              <th>Date Joining</th>
              <th>Options</th>
            
            </thead>
            <tbody>
          
              {
              
             employees && employees.slice(indexOfFirstRecord, 
              indexOfLastRecord).map((emp)=>
                <tr key={emp.EmployeeId}>
                 <td>{emp.EmployeeId}</td>
                 <td>{emp.EmployeeName}</td>
                 <td>{emp.Phone}</td>
                 <td>{emp.Email}</td>
                 <td>{emp.Salary}</td>
                 <td>{emp.Department}</td> 
                 <td>{moment(emp.Datejoining).format("MMM Do YYYY")}</td> 
                 <td>
                 
                 <button type='button' onClick={()=>editClick(emp.EmployeeId, emp.EmployeeName, emp.Department,
                   emp.Datejoining, emp.Photo, emp.Phone, emp.Email,emp.Salary )} className='btn btn-primary mr-1' data-bs-toggle='modal' data-bs-target='#departmentedit'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>

                 </button>
                 <button type='button' className='btn btn-primary mx-3'  onClick={()=>deleteBtn(emp.EmployeeId)} >
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

          <nav aria-label="Page navigation example">
  <ul className="pagination">
   
  <li className="page-item"><a class="page-link" onClick={prevPage} >Previous</a></li>
    { 
    pageNumbers.map(pgNumber=>(
      <li key={pgNumber}
      className={`page-item ${currentPage==pgNumber}? 'active':''`}>
        <a class="page-link" onClick={()=>setCurrentPage(pgNumber)} >{pgNumber}</a>
        </li>
    )

    )
    
    } 
     <li className="page-item"><a class="page-link" onClick={nextPage} >Next</a></li>
   
  </ul>
</nav>
          <hr>
          </hr>
        
          <div className="modal fade" id="departmentedit" tabindex="-1" aria-labelledby="department" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="department">Edit Employee</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <div className='row'>
            <div className='col-md-8'>
          <form>
            <div className="input-group mb-3">
              <span className="input-group-text">Employee Name</span>
              
               <input value={employeeName} className="form-control" onChange={e=>setEmployeeName(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Phone</span>
              
               <input value={phone} className="form-control" onChange={e=>setPhone(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Email</span>
              
               <input value={email} className="form-control" onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Salary</span>
              
               <input value={salary} className="form-control" onChange={e=>setSalary(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Department</span>
              <select className="form-select" value={department} onChange={e=>setDepartment(e.target.value)}>
              <option key=""></option>
              {departments.map((dep)=>
              
                <option key={dep.DepartmentId}>{dep.DepartmentName}</option>
              )
                }

              </select>     
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Date Join</span>
              
               <input required value={datejoining} className="form-control date" onChange={e=>setDatejoing(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
             
              
             <input type="file"  className='input-group-text' onChange={uploadImage}/>
           </div>
          </form>
          </div>
          <div className='col-md-4'>
            <img src={variable.PHOTO_URL+photoname}  width='140' height='150' className='p-2 mb-2'/>
           
          </div>
          </div>
        </div>
        <div class="modal-footer">
        
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
         <button  onClick={editBtn} type="button" class="btn btn-primary"  data-bs-dismiss="modal">Edit employee</button>
         
         
        </div>
      </div>
    </div>
  </div>



 <div className="modal fade" id="departmentadd" tabindex="-1" aria-labelledby="department" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="department">Add Employee</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className='row'>
            <div className='col-md-8'>
          <form>
            <div className="input-group mb-3">
              <span className="input-group-text">Employee Name</span>
              
               <input required  value={employeeName} className="form-control" onChange={e=>setEmployeeName(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Phone</span>
              
               <input value={phone} className="form-control" onChange={e=>setPhone(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Email</span>
              
               <input value={email} className="form-control" onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Salary</span>
              
               <input value={salary} className="form-control" onChange={e=>setSalary(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Date Join</span>
              
               <input required  value={datejoining} className="form-control" type="date" onChange={e=>setDatejoing(e.target.value)}/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Department</span>
              <input value={department} onChange={e=>setDepartment(e.target.value)} className="form-select" list="browsers" name="browser" id="browser"/>
<datalist id="browsers">
{departments.map((dep)=>
  <option key={dep.DepartmentId} value={dep.DepartmentName}>{dep.DepartmentName}</option>

  )
  }
</datalist>    
            </div>
            
            <div className="input-group mb-3">
              
              <input type="file" className='input-group-text' onChange={uploadImage}/>
            </div>
          </form>
         
          </div>
          <div className='col-md-4'>
            <img src={variable.PHOTO_URL+photoname}  width='140' height='150' className='p-2 mb-2'/>
           
          </div>
         
          </div>
         
        </div>
        <div class="modal-footer">
        
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
         
          <button  onClick={addBtn} type="button" class="btn btn-primary"   data-bs-dismiss="modal">Add employee</button>
         
        </div>
      </div>
    </div>
    
  </div>

  </div>    
          </div>
  )
}
