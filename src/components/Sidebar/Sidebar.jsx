import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { sidebarLink } from '../../constants/sidebarLinks'
import { logout } from '../../services/MockAuthServices';

export const Sidebar = ({ sidebarRef , closeSidebar }) => {
   const path = useLocation().pathname;
   const navigate = useNavigate();

   const handleLogout = async (e) => {
      e.preventDefault();
  
      await logout();
      navigate('/');
   };
   return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar" ref={sidebarRef}>
         <ul className="nav">
            {sidebarLink.map((item, index) => (
               <li className={`nav-item ${(item.id == 1 && path == '/admin') && 'active'} ${item.link.includes(path.split('/')[2]) && 'active'}`} key={item.id}>
                  {index !== sidebarLink.length-1 ? (
                     <Link onClick={closeSidebar} title={item.title} className="nav-link" to={item.link}>
                        <i className={`${item.icon} menu-icon`}></i>
                        <span className="menu-title">{item.title}</span>
                     </Link>  
                  ) : (
                     <a className="nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                        <i className={`${item.icon} menu-icon`}></i>
                        <span className="menu-title">{item.title}</span>
                     </a>
                  )}
               </li>
            ))}
         </ul>
      </nav>
   )
}
