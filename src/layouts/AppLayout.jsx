import React, { useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Sidebar } from '../components/Sidebar/Sidebar';
import useAuth from '../hooks/useAuth';

export const AppLayout = () => {
   const auth = useAuth();
   const sidebarRef = useRef(null);
   const { pathname } = useLocation();

   const openSidebar = () => {
      sidebarRef.current.classList.toggle('active');
   }

   const closeSidebar = () => {
      sidebarRef.current.classList.remove('active')
   }
   if (auth.isAuth()) {
      return (
         <div className='container-scroller'>
            <div className='container-fluid page-body-wrapper'>
               <Navbar openSidebar={openSidebar}/>
               <Sidebar closeSidebar={closeSidebar} sidebarRef={sidebarRef} />
               <Outlet/>
            </div>
         </div>
      )
   }

   return <Navigate to={`/?redirect=${encodeURIComponent(pathname)}`} replace />;
}
