import React from 'react'
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Department from './Department';
import Employee from './Employee';
export default function Dashboard() {
  return (
    <div className="container">
      <h2 className='d-flex justify-content-center m-3'>Employee App Frontend</h2>
      <BrowserRouter>
        <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
        <ul className='navbar-nav'>  
          <li className='nav-item m-1' ><Link  className='btn btn-outline-primary' to='/home'>Home</Link></li>
          <li className='nav-item m-1' ><Link className='btn btn-outline-primary' to='/department'>Department</Link></li>
          <li className='nav-item m-1' ><Link className='btn btn-outline-primary' to='/employee'>Employee</Link></li>
          
 


        </ul>

        </nav>
        <Routes>
        
        <Route path="/home" element={<Home/>} />
        <Route path="/department" element={<Department/>} />
        <Route path="/employee" element={<Employee/>} />
        
        </Routes>
        </BrowserRouter>
    
    </div>
  )
}
