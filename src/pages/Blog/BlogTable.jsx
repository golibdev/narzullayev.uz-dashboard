import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import { blogApi } from '../../api/blog';
import { toast } from 'react-toastify';

export const BlogTable = ({ getData, data, loading }) => {
   const deleteHandler = async (id) => {
      try {
         const isConfirm = window.confirm("Rostdan ham o'chiraszmi?");

         if(isConfirm) {
            const res = await blogApi.delete(id);
            const message = await res.data.message
            toast.success(message);
            getData();
         }
      } catch (err) {
         toast.error(err.response.data.message)
      }
   }
   return (
      <div className='table-responsive'>
         <table className='table table-hover text-center'>
            <thead>
               <tr>
                  <th title='title'>Title</th>
                  <th title='Kategoriya'>Kategoriya</th>
                  <th title="Ko'rishlar soni">Ko'rishlar soni</th>
                  <th title='Yaratilgan vaqti'>Yaratilgan vaqti</th>
                  <th title='Tahrirlash'>Tahrirlash</th>
                  <th title="O'chirish">O'chirish</th>
                  <th title="O'qish">O'qish</th>
               </tr>
            </thead>
            <tbody>
               {data.map((item) => (
                  <tr key={item._id}>
                     <td title={item.title}>{!item.title ? <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> : item.title}</td>
                     <td title={item.category.categoryName}>{!item.category ? <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> : item.category.categoryName}</td>
                     <td title={item.views}>{!item.title ? <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> : item.views}</td>
                     <td title={item.title}>{!item.createdAt ? <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> : moment(item.createdAt).format('DD.MM.YYYY HH:mm:ss')}</td>
                     <td title="Tahrirlash">
                        {!item._id ? 
                           <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> :
                           <Link 
                              to={`/admin/blogs/update/${item.slugify}`}
                              className="btn btn-warning text-white px-3 py-2"
                           >
                              <i className='ti-pencil'></i>
                           </Link>
                        }
                     </td>
                     <td title="O'chirish">
                        {
                           !item._id ? 
                           <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> :
                           <button 
                              className='btn btn-danger px-3 py-2'
                              onClick={() => {
                                 deleteHandler(item._id);
                              }}
                           >
                              <i className='ti-trash'></i>
                           </button>
                        }
                     </td>
                     <td title="O'qish">
                        {!item._id ? 
                           <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> :
                           <Link 
                              to={`/admin/blogs/${item.slugify}`}
                              className="btn btn-primary text-white px-3 py-2"
                           >
                              <i className='ti-eye'></i>
                           </Link>
                        }
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}
