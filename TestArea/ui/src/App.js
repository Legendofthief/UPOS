// import './App.css'
import { store } from './actions/store'
import { Provider } from 'react-redux'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/navbar'
import { Student } from './pages/student'
import { Teacher } from './pages/teacher'
import { Home } from './pages/Home'
import { Faculty } from './pages/faculty'
import { Group } from './pages/group'
import { Department } from './pages/department'
import { Discipline } from './pages/discipline'
import { ToastContainer } from 'react-toastify'

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App container'>
          <NavBar/>
          <Routes>
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/student' element={<Student />} />
            <Route exact path='/teacher' element={<Teacher />} />
            <Route exact path='/faculty' element={<Faculty />} />
            <Route exact path='/group' element={<Group />} />
            <Route exact path='/department' element={<Department />} />
            <Route exact path='discipline' element={<Discipline />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer
        position='top-center'
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </Provider>
  )
}

export default App
