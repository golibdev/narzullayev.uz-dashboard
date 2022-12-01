import axios from 'axios';
import { baseUrl, headers } from '../constants';

export const categoryApi = {
   getAll: () => axios.get(
      `${baseUrl}category`
   ),
   getOne: (id) => axios.get(
      `${baseUrl}category/${id}`
   ),
   create: (params) => axios.post(
      `${baseUrl}category`,
      params,
      headers
   ),
   update: (id, params) => axios.put(
      `${baseUrl}category/${id}`,
      params,
      headers
   ),
   delete: (id) => axios.delete(
      `${baseUrl}category/${id}`,
      headers
   )
}