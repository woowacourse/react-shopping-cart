import { REQUEST_STATUS, REQUEST_TIMEOUT } from 'constants/';

const request = async (url, option) => {
  const fetchController = new AbortController();
  const newOption = { ...option, signal: fetchController.signal };

  const timerID = setTimeout(() => fetchController.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(process.env.REACT_APP_API_URL + url, newOption);
    const jsonBody = await response.json();
    const responseHeader = Object.fromEntries(response.headers.entries());

    clearTimeout(timerID);

    return {
      status: response.ok ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.FAIL,
      statusCode: response.status,
      header: responseHeader,
      content: jsonBody,
    };
  } catch (error) {
    return {
      status: REQUEST_STATUS.FAIL,
      content: `서버와의 통신에 실패하였습니다.\n(${error.message})`,
    };
  }
};

const createAsyncState = {
  initial: (defaultContent) => ({
    isLoading: false,
    isLoaded: false,
    content: defaultContent,
    error: null,
  }),
  pending: () => ({ isLoading: true, isLoaded: false, error: null }),
  success: () => ({ isLoading: false, isLoaded: true, error: null }),
  error: (error) => ({ isLoading: false, isLoaded: false, error }),
};

export { request, createAsyncState };
