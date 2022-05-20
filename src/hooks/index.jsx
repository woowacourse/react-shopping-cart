import { useDispatch, useSelector } from 'react-redux';

import { getProductList } from 'apis/product';
import { getCartList } from 'apis/cart';

import { getProductLoading } from 'modules/product';
import { getProductCartLoading } from 'modules/cart';

export const useProducts = () => {
  const products = useSelector((state) => state.product.products);
  const isProductLoading = useSelector((state) => state.product.getProductLoading);
  const requestProductFail = useSelector((state) => state.product.getProductFail);
  const dispatch = useDispatch();

  const requestProduct = () => {
    dispatch(getProductLoading());
    dispatch(getProductList());
  };

  return { isProductLoading, requestProductFail, products, requestProduct };
};

export const useCart = () => {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const isCartProductsLoading = useSelector((state) => state.cart.getProductCartLoading);
  const requestCartProductFail = useSelector((state) => state.cart.getProductCartFail);
  const dispatch = useDispatch();

  const requestCartProducts = () => {
    dispatch(getProductCartLoading());
    dispatch(getCartList());
  };

  return { isCartProductsLoading, requestCartProductFail, cartProducts, requestCartProducts };
};
