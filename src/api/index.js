import requestAsync from './RequestAsync';

const requestGetProductList = async () => requestAsync.get('products');
const requestGetProduct = async (id) => requestAsync.get(`product?id=${id}`);

export { requestGetProductList, requestGetProduct };
