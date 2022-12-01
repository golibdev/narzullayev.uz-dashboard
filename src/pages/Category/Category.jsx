import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { categoryApi } from '../../api/category';
import { CategoryTable } from './CategoryTable';

export const Category = () => {
   const [categories, setCategories] = useState([])
   const [loading, setLoading] = useState(false);
   const getCategories = async () => {
      try {
         const res = await categoryApi.getAll();
         const data = await res.data.categories
         setLoading(true);
         setCategories(data);
      } catch (err) {}
   }
   useEffect(() => {
      getCategories();
   }, [])
   return (
      <div className='main-panel'>
         <div className='content-wrapper'>
            <div className="card shadow bg-white">
               <div className="bg-white card-header d-flex justify-content-between align-items-center">
                  <h3 className='m-0'>Kategoriyalar</h3>
                  <Link className='btn btn-primary p-2' to={'/admin/category/create'}>
                     Kategoriya yaratish
                  </Link>
               </div>
               {categories.length > 0 && <div className="card-body bg-white">
                  <CategoryTable 
                     getCategories={getCategories} 
                     loading={loading} 
                     categories={categories} 
                  />
               </div>}
            </div>
         </div>
      </div>
   )
}
