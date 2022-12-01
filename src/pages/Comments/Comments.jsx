import { useState, useEffect } from 'react'
import { commentApi } from '../../api/comments';
import { Pagination } from '../../components/Pagination/Pagination';
import { CommentTable } from './CommentTable';

export const Comments = () => {
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState([]);
   const [currentPage, setCurrentPage] = useState(0);
   const [pageCount, setPageCount] = useState(0);

   const getData = async () => {
      try {
         const res = await commentApi.getAll();
         const comments = await res.data.comments;
         const pagination = await res.data.pagination;
         setData(comments);
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
                  <h3 className='m-0'>Izohlar</h3>
               </div>
               {data.length > 0 && 
                  <>
                     <div className="card-body bg-white">
                        <CommentTable 
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
                           type={"COMMENT"}
                        />
                     </div>}
                  </>
               }
            </div>
         </div>
      </div>
   )
}
