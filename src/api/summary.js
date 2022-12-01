import axios from 'axios';
import { baseUrl, headers } from '../constants';

export const summaryApi = {
   getSummary: () => axios.get(
      `${baseUrl}summary`,
      headers
   )
}