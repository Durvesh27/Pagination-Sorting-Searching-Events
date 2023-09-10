
import './App.css';
import Home from './Components/Common/Home';
import Login from './Components/user/Login';
import Register from './Components/user/Register';
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
