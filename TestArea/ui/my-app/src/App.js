import logo from './logo.svg';
import './App.css';
import {Student} from './student';
import {Teacher} from './teacher';
import {Home} from './Home'
import {Faculty} from './faculty';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/student">
              Student
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/teacher">
              Teacher
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/faculty">
              Faculty
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/student" element={<Student />}/>
        <Route exact path="/teacher" element={<Teacher />}/>
        <Route exact path="/faculty" element={<Faculty />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;