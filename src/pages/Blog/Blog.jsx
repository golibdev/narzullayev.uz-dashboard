import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { blogApi } from '../../api/blog';
import { Pagination } from '../../components/Pagination/Pagination';
import { BlogTable } from './BlogTable';

export const Blog = () => {
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState([]);
   const [currentPage, setCurrentPage] = useState(0);
   const [pageCount, setPageCount] = useState(0);

   const getData = async () => {
      try {
         const res = await blogApi.getPageAll();
         const blogs = await res.data.blogs;
         const pagination = await res.data.pagination
         setData(blogs);
         setPageCount(Math.ceil(pagination.total / 10));
         setLoading(true);
      } catch (err) {}
   }
   
   useEffect(() => {
      getData();
   }, [])
   return (
      <div className='main-panel'>
         <div className='content-wrapper'>
            <div className="card shadow bg-white">
               <div className="bg-white card-header d-flex justify-content-between align-items-center pt-3">
                  <h3 className='m-0'>Maqolalar</h3>
                  <Link title="Maqola yaratish" className='btn btn-primary p-2' to={'/admin/blogs/create'}>
                     Maqola yaratish
                  </Link>
               </div>
               {data.length > 0 && 
                  <>
                     <div className="card-body bg-white">
                        <BlogTable 
                           data={data} 
                           loading={loading} 
                           getData={getData} 
                        />
                     </div>
                     {pageCount > 1 && <div className="card-footer bg-white">
                        <Pagination 
                           setData={setData} 
                           currentPage={currentPage}
                           pageCount={pageCount}
                           setCurrentPage={setCurrentPage}
                           type={"BLOG"}
                        />
                     </div>}
                  </>
               }
            </div>
         </div>
      </div>
   )
}
