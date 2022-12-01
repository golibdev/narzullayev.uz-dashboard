import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { Category } from '../pages/Category/Category';
import { CategoryCreate } from '../pages/Category/CategoryCreate';
import { CategoryUpdate } from '../pages/Category/CategoryUpdate';
import { LoginPage } from '../pages/Login/LoginPage';
import { Blog } from '../pages/Blog/Blog';
import { BlogCreate } from '../pages/Blog/BlogCreate';
import { BlogUpdate } from '../pages/Blog/BlogUpdate';
import { BlogPage } from '../pages/Blog/BlogPage';
import { Comments } from '../pages/Comments/Comments';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Settings } from '../pages/Settings/Settings';
import AuthProvider from '../hooks/AuthProvider'
import { MainLayout } from '../layouts/MainLayout';
import { NotFound } from '../pages/Error/NotFound';

export const Router = () => {
   return (
      <BrowserRouter>
         <AuthProvider>
            <Routes>
               <Route path='/' element={<MainLayout/>}>
                  <Route index element={<LoginPage/>}/>
               </Route>
               <Route path='*' element={<NotFound/>}/>
               <Route path='/admin' element={<AppLayout/>}>
                  <Route index element={<Dashboard/>} />
                  <Route path='/admin/settings' element={<Settings/>} />
                  <Route path='/admin/category' element={<Category/>} /> 
                  <Route path='/admin/category/create' element={<CategoryCreate/>} /> 
                  <Route path='/admin/category/update/:id' element={<CategoryUpdate/>} /> 
                  <Route path='/admin/blogs' element={<Blog/>} />
                  <Route path='/admin/blogs/create' element={<BlogCreate/>} />
                  <Route path='/admin/blogs/update/:id' element={<BlogUpdate/>} />
                  <Route path='/admin/blogs/:id' element={<BlogPage/>} />
                  <Route path='/admin/comments' element={<Comments/>} />
               </Route>
            </Routes>
         </AuthProvider>
      </BrowserRouter>
   )
}
