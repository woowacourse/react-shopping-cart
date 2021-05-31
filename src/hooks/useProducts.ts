import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { requestAddProductToCart } from '../apis';
import { RootState } from '../modules';
import { getProducts } from '../modules/products/actions';
import { asyncAction as cartAsyncAction } from '../modules/cart/actions';
import { Product } from '../type';

const useProducts = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    if (products.length !== 0) return;
    dispatch(getProducts());
  }, [dispatch, products]);

  const addProductToCart = async (id: Product['id']) => {
    await requestAddProductToCart(id);
    dispatch(cartAsyncAction.getCartItems());
  };

  return { products, loading, error, addProductToCart };
};

export default useProducts;
