import { requestTable } from '../api/request';

const requestProductList = async () => await requestTable.GET('/api/products');

const requestProduct = async productId => await requestTable.GET(`/api/products/${productId}`);

export { requestProductList, requestProduct };
