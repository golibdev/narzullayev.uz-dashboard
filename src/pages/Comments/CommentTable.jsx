import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import { commentApi } from '../../api/comments';
import { toast } from 'react-toastify';

export const CommentTable = ({ getData, data, loading }) => {
   const deleteHandler = async (id) => {
      try {
         const isConfirm = window.confirm("Rostdan ham o'chirmoqchimisiz?");

         if(isConfirm) {
            const res = await commentApi.delete(id);
            const msg = await res.data.message;
            toast.success(msg);
            getData();
         }
      } catch (err) {
         toast.error(err.response?.data?.message)
      }
   }
   return (
      <div className='table-responsive'>
         <table className='table table-hover text-center'>
            <thead>
               <tr>
                  <th title='email'>email</th>
                  <th title='izoh'>Izoh</th>
                  <th title='maqola'>Maqola</th>
                  <th title="Yaratilgan vaqti">Yartilgan vaqti</th>
                  <th title="o'chirish">O'chirish</th>
               </tr>
            </thead>
            <tbody>
               {data.map(item => (
                  <tr key={item._id}>
                     <td title={item.email}>{!item.email ? <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> : item.email}</td>
                     <td title={item.email}>{!item.comment ? <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> : item.comment}</td>
                     <td title={item.email}>{!item.blog ? <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> : item.blog.title}</td>
                     <td title={item.email}>{!item.createdAt ? <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> : moment(item.createdAt).format('DD.MM.YYYY HH:mm:ss')}</td>
                     <td title={item.email}>
                        {
                        !item._id ? 
                           <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> 
                           : <button 
                              onClick={() => {
                                 deleteHandler(item._id)
                              }}
                              className='btn btn-danger px-3 py-2'>
                              <i className='ti-trash'></i>
                           </button> 
                        }
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}
