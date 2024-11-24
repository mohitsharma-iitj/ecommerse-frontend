import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import CustomerRouters from './customer/Routers/CustomerRouters';


function App() {
  return (
    <div className="" >
      <Routes>
        < Route path='/*' element={< CustomerRouters />}>
        </Route>
      </Routes>





    </div>

  );
}

export default App;