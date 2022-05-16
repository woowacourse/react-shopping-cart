import axios from 'axios';

let url;

if (process.env.NODE_ENV === 'production') {
  url = process.env.REACT_APP_API_URL;
}

const apiClient = axios.create({
  baseURL: url,
  responseType: 'json',
});

export default apiClient;
