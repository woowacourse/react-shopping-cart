import { request } from 'lib/requestUtils';

const requestGetProductList = (page = 1) =>
  request(`/shopping?_page=${page}&_limit=12`, { method: 'GET' });

export { requestGetProductList };
