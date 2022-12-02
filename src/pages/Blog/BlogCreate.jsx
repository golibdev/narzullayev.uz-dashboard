import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import { categoryApi } from '../../api/category'
import { blogApi } from '../../api/blog'
import { TextEditor } from '../../components/TextEditor/TextEditor';

export const BlogCreate = () => {
   const [categories, setCategories] = useState([]);
   const content = useRef(null);
   const [title, setTitle] = useState('');
   const categoryName = useRef(null);
   const image = useRef(null);
   const [shortContent, setShortContent] = useState('');

   const getCategories = async () => {
      try {
         const res = await categoryApi.getAll();
         setCategories(res.data.categories);
      } catch (err) {}
   }

   useEffect(() => {
      getCategories();
   }, [])

   const options = categories.map(item => ({
      value: item._id,
      label: item.categoryName
   }))

   const handleSubmit = async (e) => {
      e.preventDefault();
      const check = {
         titleExist: title.trim().length === 0,
         shortContentExist: shortContent.trim().length === 0,
         contentExist: content.current?.getContent() ? content.current.getContent().trim().length === 0 : true,
         categoryNameExists: categoryName.current.state.ariaSelection.value.value.trim().length === 0
      }

      const { titleExist, shortContentExist, contentExist, categoryNameExists } = check;

      if(titleExist || shortContentExist || contentExist || categoryNameExists) {
         return toast.warning("Barcha maydonlarni to'ldiring!");
      };

      const params = new FormData();

      params.append('title', title);
      params.append('shortContent', shortContent);
      params.append('category', categoryName.current.state.ariaSelection.value.value);
      params.append('image', image.current.files[0]);
      params.append('content', content.current?.getContent());
      try {
         const res = await blogApi.create(params);
         const message = await res.data.message
         toast.success(message);
         setTitle('');
         setShortContent('');
         image.current.value = ''
         content.current.setContent('');
         categoryName.current.clearValue();
      } catch (err) {
         toast.error(err.response.data.message);
      }
   }
   return (
      <div className='main-panel'>
         <div className='content-wrapper'>
            <form onSubmit={handleSubmit} className="card shadow bg-white">
               <div className="py-4 bg-white card-header d-flex justify-content-between align-items-center">
                  <Link className='btn btn-primary p-2 d-flex align-items-center' to={'/admin/blogs'}>
                     <i className='ti-arrow-left mr-2'></i>
                     <span>Ortga</span>
                  </Link>
                  <h4 className='m-0'>Yangi maqola yaratish</h4>
               </div>
               <div className="card-body bg-white">
                  <div className="row">
                     <div className="col-lg-8 order-lg-1 order-2">
                        <label htmlFor="title">Maqola kontenti</label>
                        <TextEditor content={content}/>
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
                              ref={categoryName}
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
                              ref={image}
                           />
                        </div>
                     </div>
                  </div>
               </div>
               <div className="card-footer bg-white">
                  <button className='btn btn-primary d-flex align-items-center p-2'>
                     <span className='mr-2'>Qo'shish</span>
                     <i className='ti ti-plus'></i>
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}
