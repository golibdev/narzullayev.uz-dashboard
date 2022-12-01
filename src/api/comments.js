import axios from 'axios';
import { baseUrl, headers } from '../constants';

export const commentApi = {
   getAll: () => axios.get(
      `${baseUrl}comment`,
      headers
   ),
   getPagination: (page) => axios.get(
      `${baseUrl}comment?page=${page}`,
      headers
   ),
   getOne: (id) => axios.get(
      `${baseUrl}comment/${id}`,
      headers
   ),
   create: (params) => axios.post(
      `${baseUrl}comment`,
      params
   ),
   delete: (id) => axios.delete(
      `${baseUrl}comment/${id}`,
      headers
   )
}