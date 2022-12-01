import { toast } from 'react-toastify';
import { authApi } from '../api/auth'

export const auth = async (payload, navigate) => {
   try {
      const res = await authApi.login(payload);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('fullName', res.data.admin.fullName);
      navigate('/admin')
   } catch (err) {
      if(err.response === undefined) {
         toast.error('Internetga ulanmagan')
         return
      } else if(err.response.status === 400) {
         toast.error(err.response.data.message)
         return
      }
   }
}