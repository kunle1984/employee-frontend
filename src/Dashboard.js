import React from 'react'

import Navigation from './Navigation';
import { variable } from "./Variable";


function Dashboard() {




  return (
    <div className="container">
      <Navigation/>
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

export default Dashboard
