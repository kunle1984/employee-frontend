import {React, useRef, useEffect,useState, useRef} from 'react'
const userRef=useRef();
const errRef=useRef();
const [user, setUser]=useState();
const [errMessage, setErrMessage]=useState();
const [password, setPassword]=useState();
const [success, setSuccess]=useState(false)

useEffect(()=>{
    userRef.current.focus();
},[])

useEffect(()=>{
   setErrMessage('')
},[user, password])
const Logintest = () => {
  return (
    <section>
        <p ref={errRef} className={errMessage? 'errMessage':'offscreen'} aria-live='assertive'>{errMessage}</p>
      
      
    </section>
  )
}

export default Logintest
