import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { categoryApi } from '../../api/category';

export const CategoryUpdate = () => {
   const id = useParams().id
   const navigate = useNavigate();
   const [categoryName, setCategoryName] = useState('');

   const getData = async () => {
      try {
         const res = await categoryApi.getOne(id);
         const data = await res.data.category;
         setCategoryName(data.categoryName);
      } catch (err) {}
   }

   useEffect(() => {
      getData()
   }, [id])

   const updateHandler = async (e) => {
      e.preventDefault();

      if(categoryName.trim().length === 0) {
         return toast.warning("Barcha maydonlarni to'ldiring")
      }
      const params = {categoryName};
      try {
         const res = await categoryApi.update(id, params);
         const msg = await res.data.message;
         toast.success(msg);
         navigate('/admin/category');
      } catch (err) {
         toast.error(err.response.data.message);
      }
   }
   
   return (
      <div className='main-panel'>
         <div className='content-wrapper'>
            <form onSubmit={updateHandler} className="card shadow bg-white">
               <div className="py-4 bg-white card-header d-flex justify-content-between align-items-center">
                  <Link className='btn btn-primary p-2 d-flex align-items-center' to={'/admin/category'}>
                     <i className='ti-arrow-left mr-2'></i>
                     <span>Ortga</span>
                  </Link>
                  <h4 className='m-0'>Kategoriyani tahrirlash</h4>
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
                  <button className='d-flex align-items-center btn btn-success p-2'>
                     <i className='ti-save mr-2'></i>
                     <span>Saqlash</span>
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}
