import React, { useState, useEffect } from 'react'
import EmployeeApi from './EmployeeApi';
import {useCookies} from 'react-cookie' ;
import { useNavigate} from 'react-router-dom';

function Register() {

const [username, setUsername]=useState('')
const [password, setPassword]=useState('')
const [email, setEmail]=useState('')
const [token, setToken]=useCookies(['mytoken'])
const [isLogin, setLogin]=useState(0)
const [errMsg, setErrMsg] = useState('');

let navigate=useNavigate()
useEffect(()=>{
    if(token['mytoken'] && token['mytoken'] !=='undefined'){
      navigate('/dashboard')
      setLogin(1)
      setToken(token)  
    
    }else{
      
        if(token['mytoken'] && token['mytoken'] ==='undefined'){
        setErrMsg('Invalid logins')
      }
      }
  
  },[token])
const Login=()=>{
       
    EmployeeApi.UserLogin({username,password})
    setLogin(1)      
    
}
   const btnRegister=async(e)=>{
    e.preventDefault();
    EmployeeApi.UserRegister({username,password, email})
    .then(res=>setToken('mytoken',res.token))
    .then(()=>Login())
    setLogin(1)

    }
    
    const btnLogin=()=>{
        navigate('/login')

    }
  return (
    <div className='container'>

    <div className='row justify-content-center mt-5'>
      <div className='col-md-6'>
         
        <h3>Register</h3>
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className='input-group mb-3'>
          <span className="input-group-text">Username</span>
          <input className='form-control' value={username} onChange={(e)=>setUsername(e.target.value)}  />
        </div>
        <div className='input-group mb-3'>
          <span className="input-group-text">Email</span>
          <input className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}  />
        </div>
        <div className='input-group mb-3'>
          <span className="input-group-text">Password</span>
          <input className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className='row'>
          <div className='col-md-12'>
          <button type='submit' onClick={btnRegister} className='btn btn-primary '>Register</button>
        <span>Already have an account? <button type='submit' onClick={btnLogin} className='btn btn-outline-primary mx-3'>Login</button></span>

          </div>
        </div>
       

      </div>
     

    </div>
   
  </div>
  )
}

export default Register
