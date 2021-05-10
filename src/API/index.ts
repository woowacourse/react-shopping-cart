import { API_BASE_URL, METHOD } from '../constants/API';

const APIClient = {
  async get<T>(path: string) {
    const response = await fetch(API_BASE_URL + path);

    return response.json();
  },

  async post<T>(path: string, data: T) {
    const response = await fetch(API_BASE_URL + path, {
      method: METHOD.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
};

export default APIClient;
