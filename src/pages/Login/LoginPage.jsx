import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

export const LoginPage = () => {
   const navigate = useNavigate();
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const { login } = useAuth();

   const handleLogin = async (e) => {
      e.preventDefault();

      const check = {
         username: username.trim().length === 0,
         password: password.trim().length === 0
      }

      if(check.username || check.password) {
         return toast.warning("Barcha maydonlarni to'ldiring!");
      }
      try {
         const res = await login(username, password);
         const { message } = res;
         if(res.status === 200) {
            navigate('/admin')
            return toast.success(message);
         } else {
            return toast.error(message);
         }
      } catch (err) {}
   }

   return (
      <div className="content-wrapper d-flex align-items-center auth px-0">
         <div className="row w-100 mx-0">
            <div className="col-lg-4 col-md-6 mx-auto">
               <div className="auth-form-light text-left py-5 px-4 px-sm-5 shadow" style={{ borderRadius: '10px' }}>
               <h4>Davom etish uchun tizimga kiring.</h4>
                  <form className="pt-3" autoComplete='off'>
                     <div className="form-group">
                        <input 
                           type="text"
                           className='form-control'
                           placeholder="Foydalanuvchi nomi"
                           value={username}
                           onChange={e => setUsername(e.target.value)}
                        />
                     </div>
                     <div className="form-group">
                        <input 
                           type="password"
                           className='form-control'
                           placeholder="Parol"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                        />
                     </div>
                     <div className="mt-3">
                        <button className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                           type="button"
                           onClick={handleLogin}
                        >
                           KIRISH
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}
