import { useState, useEffect, useRef } from 'react';
import { authApi } from '../../api/auth';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

export const Settings = () => {
   const [admin, setAdmin] = useState({})
   const [fullName, setFullName] = useState('')
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [isLoading, setIsloading] = useState(false);
   const fullNameRef = useRef(null)
   const usernameRef = useRef(null)
   const passwordRef = useRef(null)
   const successBtnRef = useRef(null)
   const updateBtnRef = useRef(null)


   const getMyData = async () => {
      try {
         const res = await authApi.getMyData()
         setAdmin(res.data?.admin)
         setFullName(res.data?.admin?.fullName)
         setUsername(res.data?.admin?.username)
         setPassword(res.data?.admin?.password)
         setIsloading(true)
      } catch (err) {
         console.log(err.response);
      }
   }

   useEffect(() => {
      getMyData()
   }, [])

   const successBtnVisible = (e) => {
      e.preventDefault()
      e.target.classList.add('d-none')
      successBtnRef.current.classList.remove('d-none')
      fullNameRef.current.removeAttribute('disabled')
      usernameRef.current.removeAttribute('disabled')
      passwordRef.current.removeAttribute('disabled')
   }

   const updateMyData = async (e) => {
      e.preventDefault()

      const check = {
         fullName: fullName.trim().length === 0,
         username: username.trim().length === 0,
         password: password.trim().length === 0,
      }

      if(check.password && check.username) {
         setUsername(admin.username);
         setPassword(admin.password);
         toast.warning("Maydonalar to'ldirilmagan")
         return
      }

      const params = {
         username: username ? username : admin.username,
         password: password ? password : admin.password,
         fullName: fullName ? fullName : admin.fullName
      }

      try {
         const res = await authApi.update(params);
         toast.success(res.data.message)
         localStorage.setItem('fullName', fullName);
         e.target.classList.add('d-none')
         successBtnRef.current.classList.add('d-none');
         updateBtnRef.current.classList.remove('d-none');
         fullNameRef.current.setAttribute('disabled', true);
         usernameRef.current.setAttribute('disabled', true);
         passwordRef.current.setAttribute('disabled', true);
      } catch (err) {
         console.log(err.response);
      }
   }

   const viewPass = (e) => {
      if(e.target.checked) {
         passwordRef.current.setAttribute('type', 'text')
      } else {
         passwordRef.current.setAttribute('type', 'password')
      }
   }
   return (
      <div className='main-panel'>
         <div className="content-wrapper">
            <form className='card shadow'>
               <div className="card-body bg-white pt-4">
                  <div className='mb-3'>
                     <label className='pt-0' htmlFor="username">
                        F.I.SH
                     </label>
                     <input 
                        type="text"
                        className='form-control' 
                        id="fullName"
                        placeholder='F.I.SH'
                        ref={fullNameRef}
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        disabled
                     />
                  </div>
                  <div className='mb-3'>
                     <label className='pt-0' htmlFor="username">Foydalanuvchi nomi</label>
                     <input 
                        type="text"
                        className='form-control' 
                        id="username"
                        placeholder='Foydalanuvchi nomi'
                        ref={usernameRef}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        disabled
                     />
                  </div>
                  <div className='mb-3'>
                     <label className='pt-0' htmlFor="password">Foydalanuvchi paroli</label>
                     <input 
                        type="password"
                        className='form-control' 
                        id="password"
                        placeholder='Foydalanuvchi paroli'
                        ref={passwordRef}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled
                     />
                  </div>
                  <div className="mb-3 form-check">
                     <input
                        onClick={viewPass} 
                        type="checkbox" 
                        className="form-check-input" 
                        id="viewPass"
                     />
                     <label className="form-check-label" htmlFor="viewPass">Parolni ko'rish</label>
                  </div>
               </div>
               <div className='card-footer bg-white'>
                  <button 
                     className='btn btn-success d-none' 
                     ref={successBtnRef}
                     onClick={updateMyData}
                  >
                     Saqlash
                  </button>
                  <button className='btn btn-primary' ref={updateBtnRef} onClick={successBtnVisible}>Tahrirlash</button>
               </div>
            </form>
         </div>
      </div>
   )
}
