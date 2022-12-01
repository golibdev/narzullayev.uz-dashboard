import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import { categoryApi } from '../../api/category';
import { blogApi } from '../../api/blog';
import { UpdateEditor } from '../../components/TextEditor/UpdateEditor';

export const BlogUpdate = () => {
   const slugify = useParams().id;
   const [loading, setLoading] = useState(false);
   const [categories, setCategories] = useState([]);
   const [blog, setBlog] = useState({})
   const content = useRef(null);
   const [title, setTitle] = useState('');
   const [categoryName, setCategoryName] = useState('');
   const [image, setImage] = useState('');
   const [shortContent, setShortContent] = useState('');

   const getCategories = async () => {
      try {
         const res = await categoryApi.getAll();
         setCategories(res.data.categories);
         setLoading(true);
      } catch (err) {}
   }

   const getBlog = async () => {
      try {
         const res = await blogApi.getOne(slugify);
         const { title, shortContent, content, category, image } = res.data.blog;
         setBlog(res.data.blog);
         setTitle(title);
         setCategoryName(category._id);
         setImage(image);
         setShortContent(shortContent);
         content.current.setContent(content);
      } catch (err) {}
   }

   useEffect(() => {
      getCategories();
      getBlog();
   }, [slugify])

   const options = categories.map(item => ({
      value: item._id,
      label: item.categoryName
   }))

   const updateHandler = async (e) => {
      e.preventDefault();
      const params = new FormData();

      params.append('title', title ? title : blog.title);
      params.append('shortContent', shortContent ? shortContent : blog.shortContent);
      params.append('image', image ? image : blog.image);
      params.append('category', categoryName ? categoryName : blog.category);
      params.append('content', content.current?.getContent() ? content.current?.getContent() : blog.content);
      try {
         const res = await blogApi.update(slugify, params);
         const message = await res.data.message
         toast.success(message);
      } catch (err) {
         toast.error(err.response?.data?.message)
      }
   } 

   return (
      <div className='main-panel'>
         <div className='content-wrapper'>
            <form onSubmit={updateHandler} className="card shadow bg-white">
               <div className="py-4 bg-white card-header d-flex justify-content-between align-items-center">
                  <Link className='btn btn-primary p-2 d-flex align-items-center' to={'/admin/blogs'}>
                     <i className='ti-arrow-left mr-2'></i>
                     <span>Ortga</span>
                  </Link>
                  <h4 className='m-0'>Maqolani tahrirlash</h4>
               </div>
               <div className="card-body bg-white">
                  <div className="row">
                     <div className="col-lg-8 order-lg-1 order-2">
                        <label htmlFor="title">Maqola kontenti</label>
                        <UpdateEditor content={content} blog={blog} />
                     </div>
                     <div className="col-lg-4 order-lg-2 order-1">
                        <div className="mb-2">
                           <label htmlFor="title">Maqola sarlavhasi</label>
                           <input 
                              type="text" 
                              className="form-control" 
                              id="title" 
                              placeholder="Frontend haqida"
                              value={title}
                              onChange={e => setTitle(e.target.value)}
                           />
                        </div>
                        <div className="mb-2">
                           <label htmlFor="shortContent">Maqola haqida qisqacha ma'lumot</label>
                           <textarea 
                              type="text" 
                              className="form-control" 
                              id="shortContent" 
                              placeholder="Frontend haqida"
                              rows={7}
                              value={shortContent}
                              onChange={e => setShortContent(e.target.value)}
                           />
                        </div>
                        <div className="mb-2">
                           <label htmlFor="categoryName">Kategoriya</label>
                           {categories ? <Select 
                              options={options}
                              onChange={e => setCategoryName(e.value)}
                              value={
                                 options.filter(option => option.value == categoryName)
                              }
                              isOptionSelected
                              id='categoryName'
                           /> : <Skeleton baseColor='#ddd8d8' width={'100%'} />}
                        </div>
                        <div className="mb-2">
                           <label htmlFor="image">Maqola rasmi</label>
                           <input 
                              type="file" 
                              className="form-control-file" 
                              id="image"
                              onChange={e => setImage(e.target.files[0])}
                           />
                        </div>
                     </div>
                  </div>
               </div>
               <div className="card-footer bg-white">
                  <button className='btn btn-success d-flex align-items-center p-2'>
                     <span className='mr-2'>Saqlash</span>
                     <i className='ti ti-save'></i>
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}
