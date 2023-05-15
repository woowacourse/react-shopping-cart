import HTTPError from './HTTPError';

const fetchAPI = async (endpoint: RequestInfo | URL, option?: RequestInit) => {
  try {
    const response = await fetch(endpoint, option);

    if (!response.ok) {
      throw new HTTPError(response.status);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    alert(error);
  }
};

export { fetchAPI };
