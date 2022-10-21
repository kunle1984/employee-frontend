import React, { useState, useEffect } from 'react';
import { variable } from "./Variable";
import EmployeeApi from './EmployeeApi';
import {useCookies} from 'react-cookie' ;
import {useNavigate} from 'react-router-dom';
import './App.css';




function Login() {
const [username, setUsername]=useState('')
const [password, setPassword]=useState('')
const [token, setToken]=useCookies(['mytoken'])
const [isLogin, setLogin]=useState(0)
const [errMsg, setErrMsg] = useState('');



let navigate =useNavigate()
useEffect(() => {
  setErrMsg('');
}, [username, password])

const isLogins=true
useEffect(()=>{
  if(token['mytoken'] && token['mytoken'] !=='undefined'){
    navigate('/dashboard')
    setLogin(1)
    setToken(token)
    
    
  }else{
    navigate('/login')
    if(token['mytoken'] && token['mytoken'] ==='undefined'){
    setErrMsg('Invalid logins')
  }
  }

},[token])

const register=()=>{
  navigate('/register')

}


const btnLogin=async(e)=>{
  e.preventDefault();
    EmployeeApi.UserLogin({username,password}, errMsg)
    .then(res=>setToken('mytoken',res.token))
    setLogin(1)
    
    
}
  return (
    
    <div className='container'>
     
    <div className='row justify-content-center mt-5'>
      <div className='col-md-6 ' >
         
        <h3>Login</h3>
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className='input-group mb-3'>
          <span className="input-group-text">Username</span>
          <input className='form-control' value={username} onChange={(e)=>setUsername(e.target.value)}  />
        </div>
        <div className='input-group mb-3'>
          <span className="input-group-text">Password</span>
          <input className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className='row'>
          <div className='col-md-12'>
          <button type='submit' onClick={btnLogin} className='btn btn-primary'>Login</button>
        <span>Don't have an account? <button type='submit' onClick={register} className='btn btn-outline-primary'>Register</button></span>

          </div>
        </div>
       

      </div>
     

    </div>
   
  </div>
  )
}

export default Login
