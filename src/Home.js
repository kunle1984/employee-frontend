import React, { useState, useEffect} from 'react'
import { variable } from "./Variable";
import {useNavigate} from 'react-router-dom';

export default function Home() {
  let navigate=useNavigate();
  const goToLogin=(()=>{
    navigate('/login')
  })
  const goToReg=(()=>{
    navigate('/register')
  })

    return (
     
      <div className='container'>
         <h2 className='d-flex justify-content-center m-3'>Employee Management App </h2>
      
      <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
      <ul className='navbar-nav'> 
      
      <li className='nav-item m-1' ><button className='btn btn-outline-primary' type='button' onClick={goToReg}>Register</button> </li>
        <li className='nav-item m-1' ><button className='btn btn-outline-primary' type='button' onClick={goToLogin}>Login</button> </li>
       </ul>

      </nav>
    
        
        <div className='row'>
        <div className='col-md-6'>
          
        <img src={variable.PHOTO_URL+'employee.jpg'} width="520" height="400" alt='employee'/> 
        </div>
        <div className='col-md-6'>
        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to 
        demonstrate the visual form of a document or a typeface without relying on 
        meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
        </div>
        
        </div>
      </div>
    )
       
    }


