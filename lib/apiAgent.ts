'use server'
import axios,{AxiosInstance} from 'axios';

const apiAgent : AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 5000,
});

export default apiAgent;