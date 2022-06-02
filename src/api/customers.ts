import { API_URL } from '@/api/constants';
import { getCookie } from '@/api/cookie';
import axios from 'axios';

const customersAPI = axios.create({
  baseURL: `${API_URL}/customers`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const signUp = userInformation => {
  return customersAPI.post('/signup', userInformation);
};

export const login = userInformation => {
  return customersAPI.post('/login', userInformation);
};

export const editUser = userInformation => {
  const accessToken = getCookie('access-token');

  return customersAPI.put('/', userInformation, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const changePassword = userInformation => {
  const accessToken = getCookie('access-token');

  return customersAPI.patch('/password', userInformation, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteUser = () => {
  const accessToken = getCookie('access-token');

  return customersAPI.delete('/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getCustomer = () => {
  const accessToken = getCookie('access-token');

  return customersAPI.get('/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
