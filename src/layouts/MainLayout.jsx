import { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

export const MainLayout = () => {
   const auth = useAuth();
   const navigate = useNavigate();
   
   useEffect(() => {
      if(auth.isAuth()) {
         navigate('/admin')
      }
   }, [])

   return (
      <div className='container-fluid page-body-wrapper' style={{ background: '#F5F7FF' }}>
         <Outlet/>
      </div>
   )
}
