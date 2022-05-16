import requestAsync from './RequestAsync';

const requestGetProductList = async () => requestAsync.get('products');

export { requestGetProductList };
