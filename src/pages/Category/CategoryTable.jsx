import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import { categoryApi } from '../../api/category';
import { toast } from 'react-toastify';

export const CategoryTable = ({ getCategories, categories, loading }) => {
   const deleteHandler = async (id) => {
      try {
         const isDelete = confirm("Rostdan ham o'chirasizmi?");

         if(isDelete) {
            const res = await categoryApi.delete(id);
            const msg = await res.data.message;
            toast.success(msg);
            getCategories();
         }
      } catch (err) {}
   }
   return (
      <div className='table-responsive'>
         <table className='table table-hover text-center'>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Kategoriya nomi</th>
                  <th>Maqolalar soni</th>
                  <th>Yaratilgan vaqti</th>
                  <th>Tahrirlash</th>
                  <th>O'chirish</th>
               </tr>
            </thead>
            <tbody>
               {categories.map((item, index) => (
                  <tr key={item._id}>
                     <td>{!loading ? <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> : index+1}</td>
                     <td>{!item.categoryName ? <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> : item.categoryName}</td>
                     <td>{!item.blogs ? <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> : item.blogs.length}</td>
                     <td>{!item.createdAt ? <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> : moment(item.createdAt).format('DD.MM.YYYY HH:mm:ss')}</td>
                     <td>
                        {!item._id ? 
                           <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> :
                           <Link 
                              to={`/admin/category/update/${item._id}`}
                              className="btn btn-warning text-white px-3 py-2"
                           >
                              <i className='ti-pencil'></i>
                           </Link>
                        }
                     </td>
                     <td>
                        {
                           !item._id ? 
                           <Skeleton baseColor='#ddd8d8' width={'100%'} count={2} /> :
                           <button 
                              className='btn btn-danger px-3 py-2 border-radius-none' 
                              onClick={() => {
                                 deleteHandler(item._id);
                              }}>
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
