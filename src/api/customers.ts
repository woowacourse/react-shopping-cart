import { API_URL } from '@/api/constants';
import axios from 'axios';

const customersAPI = axios.create({
  baseURL: `${API_URL}/customers/`,
});

export const signUp = userInformation => {
  return customersAPI.post('/signup', userInformation);
};

export const login = userInformation => {
  return customersAPI.post('/login', userInformation);
};
