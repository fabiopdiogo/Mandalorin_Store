import axios from 'axios';
import { baseURL } from "../utils/constant";

export const apiURL = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export const useApi = () => ({
  validateToken: async (token: string | null) => { 
    const response = await apiURL.post(`${baseURL}/validate`);
    return response.data;
  },
  signin: async (email: string, password: string): Promise<any> => {   
    const response = await axios.post(`${baseURL}/login`, { email, password });
    return response.data;
  },
  logout: async () => {
    const response = true;
    return response;
  },
  getProducts: async () =>{
    const response = await axios.get(`${baseURL}/get`);
    return response.data;
  }
});
