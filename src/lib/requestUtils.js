import { REQUEST_STATUS, REQUEST_TIMEOUT } from 'constants/';

const request = async (url, option) => {
  const fetchController = new AbortController();
  const newOption = { ...option, signal: fetchController.signal };

  const timerID = setTimeout(() => fetchController.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(process.env.REACT_APP_API_URL + url, newOption);
    const jsonBody = await response.json();

    clearTimeout(timerID);

    return {
      status: response.ok ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.FAIL,
      statusCode: response.status,
      content: jsonBody,
    };
  } catch (error) {
    return {
      status: REQUEST_STATUS.FAIL,
      content: `서버와의 통신에 실패하였습니다. (${error.message})`,
    };
  }
};

const createRequestState = {
  initial: (defaultContent) => ({ isLoading: false, content: defaultContent, error: null }),
  loading: () => ({ isLoading: true, error: null }),
  success: (content) => ({ isLoading: false, content, error: null }),
  error: (error) => ({ isLoading: false, error }),
};

const requestHandler =
  (url, option) =>
  async ({ PENDING: pendingDispatch, SUCCESS: successDispatch, ERROR: errorDispatch }) => {
    pendingDispatch();

    const response = await request(url, option);

    response.status === REQUEST_STATUS.SUCCESS
      ? successDispatch(response.content)
      : errorDispatch(response.content);
  };

export { createRequestState, requestHandler };
