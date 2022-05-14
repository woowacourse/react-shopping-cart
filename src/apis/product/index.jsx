import { requestProductsDone, requestProductsError } from 'modules/product';

export const getProductList = () => async (storeDispatch) => {
  try {
    const response = await fetch('http://localhost:4000/products');
    const products = await response.json();

    storeDispatch(requestProductsDone(products));
  } catch (error) {
    storeDispatch(requestProductsError());
  }
};
