import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../services/MockAuthServices';

export const Navbar = ({ openSidebar }) => {
   const navigate = useNavigate();

   const handleLogout = async (e) => {
      e.preventDefault();
  
      await logout();
      navigate('/');
   };
   return (
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
         <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <Link className="navbar-brand brand-logo mr-5" to={'/admin'}>
               <div className='d-flex align-items-center font-weight-bold'>
                  <span>Dashboard</span>
               </div>   
            </Link>
            <Link className="navbar-brand brand-logo-mini" to={"/"}>
            <i className='ti-dashboard mr-2 font-weight-bold' style={{ fontSize: '40px' }}></i>
            </Link>
         </div>
         <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
         <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="icon-menu"></span>
         </button>
         <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
               <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                  <img src="/images/faces/face28.jpg" alt="profile"/>
               </a>
               <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
               <Link className="dropdown-item" to={'/admin/settings'}>
                  <i className="ti-settings text-primary"></i>
                  Sozlamalar
               </Link>
               <a className="dropdown-item" onClick={handleLogout}>
                  <i className="ti-power-off text-primary"></i>
                  Chiqish
               </a>
               </div>
            </li>
         </ul>
         <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas" id="offcanvas-btn" onClick={openSidebar}>
            <span className="icon-menu"></span>
         </button>
         </div>
      </nav>
   )
}
