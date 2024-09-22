import axios,{AxiosInstance} from 'axios';
import { getCookie } from 'cookies-next';

const httpAgent : AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 5000,
});

httpAgent.interceptors.request.use((config) => {
  const token = getCookie('jwt'); 

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default httpAgent;