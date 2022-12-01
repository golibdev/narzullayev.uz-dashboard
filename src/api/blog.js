import axios from 'axios';
import { baseUrl, headers } from '../constants';

export const blogApi = {
   getAll: () => axios.get(
      `${baseUrl}blog`
   ),
   getPageAll: () => axios.get(
      `${baseUrl}blog/get-pagination`
   ),
   getPagination: (page) => axios.get(
      `${baseUrl}blog/get-pagination?page=${page}`
   ),
   getOne: (id) => axios.get(
      `${baseUrl}blog/${id}`
   ),
   create: (params) => axios.post(
      `${baseUrl}blog`,
      params,
      headers
   ),
   update: (id, params) => axios.put(
      `${baseUrl}blog/${id}`,
      params,
      headers
   ),
   delete: (id) => axios.delete(
      `${baseUrl}blog/${id}`,
      headers
   )
}