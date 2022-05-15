import { requestHandler } from 'lib/requestUtils';

const requestGetProductList = (page = 1) =>
  requestHandler(`/shopping?_page=${page}&_limit=12`, { method: 'GET' });

export { requestGetProductList };
