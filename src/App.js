
import Department from './Department';
import Employee from './Employee';
import './App.css';

function App() {
  return (
    <div>
      <div className="container">
        
      <h2 className='d-flex justify-content-center m-3'>Employee Management App</h2>
      
      <Department/>
      <Employee/>
    </div>
    </div>
    
  );
}

export default App;
