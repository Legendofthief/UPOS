import React from 'react'
import { NavLink } from 'react-router-dom'
// import { Nav, Navbar, Container } from 'react-bootstrap'

export const NavBar = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-light navbar-light'>
      <ul className='navbar-nav'>
        <li className='nav-item- m-1'>
          <NavLink className='nav-link exact' to='/home'>
            Home
          </NavLink>
        </li>
        <li className='nav-item- m-1'>
          <NavLink className='nav-link' to='/student'>
            Student
          </NavLink>
        </li>
        <li className='nav-item- m-1'>
          <NavLink className='nav-link' to='/teacher'>
            Teacher
          </NavLink>
        </li>
        <li className='nav-item- m-1'>
          <NavLink className='nav-link' to='/faculty'>
            Faculty
          </NavLink>
        </li>
        <li className='nav-item- m-1'>
          <NavLink className='nav-link' to='/group'>
            Group
          </NavLink>
        </li>
        <li className='nav-item- m-1'>
          <NavLink className='nav-link' to='/department'>
            Department
          </NavLink>
        </li>
        <li className='nav-item- m-1'>
          <NavLink className='nav-link' to='/discipline'>
            Discipline
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
