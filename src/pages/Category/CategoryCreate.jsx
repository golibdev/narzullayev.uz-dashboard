import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { categoryApi } from '../../api/category';

export const CategoryCreate = () => {
   const [categoryName, setCategoryName] = useState('');

   const createHandler = async (e) => {
      e.preventDefault();

      if(categoryName.trim().length === 0) {
         return toast.warning("Barcha maydonlarni to'ldiring")
      }
      const params = {categoryName};
      try {
         const res = await categoryApi.create(params);
         const message = await res.data.message;
         toast.success(message);
         setCategoryName('');
      } catch (err) {
         toast.error(err.response.data.message)
      }
   }
   return (
      <div className='main-panel'>
         <div className='content-wrapper'>
            <form onSubmit={createHandler} className="card shadow bg-white">
               <div className="py-4 bg-white card-header d-flex justify-content-between align-items-center">
                  <Link className='btn btn-primary p-2 d-flex align-items-center' to={'/admin/category'}>
                     <i className='ti-arrow-left mr-2'></i>
                     <span>Ortga</span>
                  </Link>
                  <h4 className='m-0'>Yangi categoriya yaratish</h4>
               </div>
               <div className="card-body bg-white">
                  <div className="mb-2">
                     <label htmlFor="categoryName">Kategoriya nomi</label>
                     <input 
                        type="text" 
                        className="form-control" 
                        id="categoryName" placeholder="Frontend" 
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                     />
                  </div>      
               </div>
               <div className="card-footer bg-white">
                  <button className='d-flex align-items-center btn btn-primary p-2'>
                     <i className='ti-plus mr-2'></i>
                     <span>Qo'shish</span>
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}
