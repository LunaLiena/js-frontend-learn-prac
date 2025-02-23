import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchRequests = async () => {
  const response = await axios.get(`${API_URL}/requests`);
  return response.data;
};

export const createRequest = async (data: any) => {
  const response = await axios.post(`${API_URL}/requests`, data);
  return response.data;
};

export const updateRequest = async (data: any) => {
  const response = await axios.put(`${API_URL}/requests/${data.id}`, data);
  return response.data;
};

export const login = async (username:string,password:string) =>{
    try{
        const response = await axios.post(`${API_URL}/login`,{username,password});
        return response.data;
    }catch(err){
        throw new Error('Ошибка при входе в систему');
    }
};
