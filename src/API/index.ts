import { API_BASE_URL } from '../constants/API';

const APIClient = {
  async get(path: string) {
    const response = await fetch(API_BASE_URL + path);

    return response.json();
  },
};

export default APIClient;
