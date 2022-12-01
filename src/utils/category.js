import { toast } from 'react-toastify';
import { categoryApi } from '../api/category';

export const category = {
   getAll: async () => {
      try {
         const res = await categoryApi.getAll();
         return res.data.categories
      } catch (err) {}
   },
   delete: async (id) => {
      try {
         const res = await categoryApi.delete(id);
         return res.data.message
      } catch (err) {}
   }
}