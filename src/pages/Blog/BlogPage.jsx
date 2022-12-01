import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import { blogApi } from '../../api/blog';

export const BlogPage = () => {
   const slugify = useParams().id;
   const [blog, setBlog] = useState({});

   const getBlog = async () => {
      try {
         const res = await blogApi.getOne(slugify);
         const data = await res.data.blog
         setBlog(data);
      } catch (err) {}
   }

   useEffect(() => {
      getBlog();
   }, [slugify])
   return (
      <div className='main-panel'>
         <div className='content-wrapper'>
            <div className="card shadow">
               <div className="card-header bg-white">
                  <Link to={'/admin/blogs'} className='btn btn-primary p-2 mb-3'>
                     <i className='ti-arrow-left mr-2'></i>
                     <span>Ortga</span>
                  </Link>
                  <div className='post-meta d-flex'>
                     <span className='date'>{blog.category ? blog.category.categoryName : <Skeleton baseColor='#ddd8d8' /> }</span>
                     <span className='mx-2'>•</span>
                     <time>{blog.createdAt ? moment(blog.createdAt).format('DD.MM.YYY HH:mm') : <Skeleton baseColor='#ddd8d8' />}</time>
                     <span className='mx-2'>•</span>
                     <span className='d-flex align-items-center'><i className='ti ti-eye mr-2'></i>{blog.views}</span>
                  </div>
               </div>
               <div className="card-body bg-white" style={{ height: '70vh', overflow: 'auto' }}>
                  <h2 className='mb-3'>{blog.title ? blog.title : <Skeleton baseColor='#ddd8d8'/>}</h2>
                  <p className='short-content text-justify'>{blog.shortContent ? blog.shortContent : <Skeleton baseColor='#ddd8d8' count={5} />}</p>

                  {blog.image ? <img className='img-fluid w-100 mb-3 rounded' src={blog.image} alt={blog.title} title={blog.title} /> : <Skeleton baseColor='#ddd8d8' height={400} />}

                  <div className='content text-justify'>
                     {blog.content ? <p dangerouslySetInnerHTML={{ __html: blog.content }}></p> : <Skeleton baseColor='#ddd8d8' count={15} />}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
