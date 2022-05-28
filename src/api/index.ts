import { GET, PUT, POST, PATCH, DELETE } from 'constants/index';

type Method = typeof GET | typeof PUT | typeof POST | typeof PATCH | typeof DELETE;

type Body = {
  [key: string]: any;
};

export const OPTIONS = (method: Method, body?: Body) => {
  switch (method) {
    case GET:
    case DELETE:
      return {
        method,
        headers: { 'Content-type': 'application/json' },
      };
    case PUT:
    case POST:
    case PATCH:
      return {
        method,
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      };
    default:
      throw Error('존재하지 않은 method입니다.');
  }
};
