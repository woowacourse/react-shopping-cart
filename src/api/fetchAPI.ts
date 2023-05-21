import { FETCH_DEFAULT_OPTION, HTTP_STATUS_CODE } from '../constants/api';
import HTTPError from './HTTPError';
import { handleAPIError } from './apiError';

const fetchAPI = async (
  endpoint: RequestInfo | URL,
  option: RequestInit = FETCH_DEFAULT_OPTION
) => {
  try {
    const response = await fetch(endpoint, option);

    if (response.status === HTTP_STATUS_CODE.NO_CONTENT) return response;

    const jsonData = await response.json();

    if (response.ok) return jsonData.data;

    handleAPIError(response.status, jsonData.errorMessage);
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    alert(error);
  }
};

export { fetchAPI };
