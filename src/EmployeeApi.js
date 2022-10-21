import { useEffect } from "react";
import { variable } from "./Variable";

export default class EmployeeApi{
    
    static getDepartments(setDepartments){
      
      return fetch(variable.API_URL+'departments/',
      {
        'method':'GET',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json',
        }
    
      })
  .then(res=>res.json())
  .then(res=>setDepartments(res))
  
    }



    static addDepartments(body){
      
       return fetch(variable.API_URL+'departments/', 
        {
            method:'POST',
              headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
               
              },
              body:JSON.stringify(body)
          
          }).then(resp=>resp.json())
         }


         static updateDepartments(body, id){
      
          return fetch(variable.API_URL+`departments/${id}/`, 
           {
               method:'PUT',
                 headers:{
                   'Content-Type':'application/json',
                   'Accept':'application/json',
                  
                 },
                 body:JSON.stringify(body)
             
             }).then(resp=>resp.json())
            }


            static deleteDepartments(id){
      
              return fetch(variable.API_URL+`departments/${id}`, 
               {
                   method:'DELETE',
                     headers:{
                       'Content-Type':'application/json',
                       'Accept':'application/json',
                      
                     }                 
                 })
                }



                //Employee Apis
                static getEmployees(setEmployees){
      
                  return fetch(variable.API_URL+'employees/',
                  {
                    'method':'GET',
                    headers:{
                      'Content-Type':'application/json',
                    }    
                  })
              .then(res=>res.json())
              .then(res=>setEmployees(res));
                }
            
            
            
                static addEmployees(body){
                  
                   return fetch(variable.API_URL+'employees/', 
                    {
                        method:'POST',
                          headers:{
                            'Content-Type':'application/json',
                            'Accept':'application/json',
                           
                          },
                          body:JSON.stringify(body)
                      
                      }).then(resp=>resp.json())
                              }
              
        static updateEmployees(body, id){
                  
                      return fetch(variable.API_URL+`employees/${id}/`, 
                       {
                           method:'PUT',
                             headers:{
                               'Content-Type':'application/json',
                               'Accept':'application/json',
                              
                             },
                             body:JSON.stringify(body)
                         
                         }).then(resp=>resp.json())
                        }
            
            
                        static deleteEmployee(id){
                  
                          return fetch(variable.API_URL+`employees/${id}`, 
                           {
                               method:'DELETE',
                                 headers:{
                                   'Content-Type':'application/json',
                                   'Accept':'application/json',
                                  
                                 }                 
                             })


 }
 
 static UserLogin(body){
 
 return  fetch(variable.API_URL+'api/login/',
  {
    'method':'POST',
      headers:{
        'Content-Type':'Application/json',
        'Accept':'application/json',
      
      },
      body:JSON.stringify(body)
  
  }
  ).then(resp=>resp.json())
  .catch(err=>console.log(err));
 
 }

 
 
 static async UserRegister(body){
   return await fetch(variable.API_URL+`api/register/`,
  {
    'method':'POST',
      headers:{
        'Content-Type':'Application/json',
        'Accept':'application/json',
      },
      body:JSON.stringify(body)
  
  }
  ).then(resp=>resp.json())
 }
        }