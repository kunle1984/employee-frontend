import React from 'react'
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie' ;


function Navigation() {
    const [token, setToken, removeToken]=useCookies(['mytoken'])



let navigate =useNavigate()
const goToDep=()=>{
  navigate('/dashboard/department/')

}

const goToHome=()=>{
  navigate('/dashboard')
  

}

const goToEmp=()=>{
  navigate('/dashboard/employee/');
  
}

const logOut=()=>{
 removeToken(['mytoken'])
 navigate('/')
  
}
  return (
    <div className="container">
    <div className='row mb-4'>
    <h2 className='d-flex justify-content-center m-3'>Employee Management App </h2>
    
      <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
      <ul className='navbar-nav'> 
      
      <li className='nav-item m-1' ><button className='btn btn-outline-primary' type='button' onClick={goToHome}>Home</button> </li>
        <li className='nav-item m-1' ><button className='btn btn-outline-primary' type='button' onClick={goToDep}>Department</button> </li>
        <li className='nav-item m-1' > <button className='btn btn-outline-primary' type='button' onClick={goToEmp}>Employee</button> </li>
        <li className='nav-item m-1' > <button className='btn btn-outline-danger' type='button' onClick={logOut}>Logout</button> </li>
       



      </ul>

      </nav>
     
      </div>
     
   
  </div>
)
}

export default Navigation
