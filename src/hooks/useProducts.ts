import { useState } from 'react';
import { requestAddProductToCart } from '../apis';
import { Product } from '../type';
import useRequest from './useRequest';
import { requestGetProducts } from '../apis/products';
import { parseProductDataList } from '../utils/parseData';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await requestGetProducts();
    setProducts(parseProductDataList(response.data));
  };

  const { loading, responseOK } = useRequest(fetchProducts);

  const addProductToCart = async (id: Product['id']) => {
    await requestAddProductToCart(id);
  };

  return { products, loading, responseOK, addProductToCart, fetchProducts };
};

export default useProducts;
