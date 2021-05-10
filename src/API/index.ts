import { API_BASE_URL, METHOD } from '../constants/API';

const APIClient = {
  async get<T>(path: string): Promise<T> {
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

  async put<T>(path: string, data: T) {
    const response = await fetch(API_BASE_URL + path, {
      method: METHOD.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },

  delete(path: string) {
    fetch(API_BASE_URL + path, {
      method: METHOD.DELETE,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  patch<T>(path: string, data: Partial<T>[]) {
    fetch(API_BASE_URL + path, {
      method: METHOD.PATCH,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};

export default APIClient;
