import axios from 'axios';

const apiClient = () => {
  const { REACT_APP_API_URL } = process.env;

  return axios.create({
    baseURL: REACT_APP_API_URL,
    responseType: 'json',
  });
};

export default apiClient;
