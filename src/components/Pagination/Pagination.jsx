import { useEffect } from 'react';
import ReactPaginate from 'react-paginate'
import { blogApi } from '../../api/blog';
import { commentApi } from '../../api/comments';

export const Pagination = ({
   setData,
   pageCount,
   setCurrentPage,
   currentPage,
   type
}) => {
   const handleClick = (e) => {
      setCurrentPage(e.selected + 1);
   }

   const getData = async (currentPage) => {
      try {
         let res;
         switch(type) {
            case "BLOG":
               res = await blogApi.getPagination(currentPage);
               setData(res.data.blogs);
            break;
            case "COMMENT":
               res = await commentApi.getPagination(currentPage);
               setData(res.data.comments);
            break;
         }
      } catch (err) {}
   }

   useEffect(() => {
      getData(currentPage);
   }, [currentPage])
   return (
      <nav className="courses-pagination mt-50">
         <ReactPaginate 
            breakLabel="..."
            onPageChange={handleClick}
            pageRangeDisplayed={5}
            nextLabel={<i className="ti-arrow-right font-weight-bold"></i>}
            previousLabel={<i className="ti-arrow-left font-weight-bold"></i>}
            pageCount={pageCount}
            containerClassName="pagination"
            pageClassName="page-item"
            activeClassName="active"
            activeLinkClassName='active'
            disabledClassName="disabled"
            breakClassName="page-item"
            nextClassName='page-item'
            previousClassName='page-item'
            pageLinkClassName='page-link'
            previousLinkClassName='page-link'
            nextLinkClassName='page-link'
         />
      </nav>
   )
}
