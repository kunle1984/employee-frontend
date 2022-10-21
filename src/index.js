import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Login from './Login';

import Department from './Department';
import Dashboard from './Dashboard';
import reportWebVitals from './reportWebVitals';
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'
import Employees from './Employee';
import Register from './Register';
import Home from './Home';



function Router(){

  return(
    <CookiesProvider>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>} />
       <Route path="/login" element={<Login/>} />
      
       <Route path="/register" element={<Register/>} />
       <Route path="/dashboard" element={<Dashboard/>} /> 
       <Route path="/dashboard/department/" element={<Department/>} />
       <Route path="/dashboard/employee/" element={<Employees/>} />
       </Routes>
    </BrowserRouter>
    </CookiesProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 
  <Router/>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
