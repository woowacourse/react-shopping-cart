import { request } from 'lib/requestUtils';

const requestGetProductList = (page = 1) =>
  request(`/shopping?_page=${page}&_limit=36`, { method: 'GET' });

export { requestGetProductList };
