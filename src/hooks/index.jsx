import { useDispatch, useSelector } from 'react-redux';

import { getCartList } from 'apis/cart';
import { getProductCartLoading } from 'modules/cart';

import { getDetailProduct, getProductList } from 'apis/product';
import { getDetailProductLoading, getProductLoading } from 'modules/product';

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

export const useDetailProduct = (id) => {
  const detailProduct = useSelector((state) => state.product.detailProduct);
  const isDetailProductLoading = useSelector((state) => state.product.getDetailProductLoading);
  const requestDetailProductFail = useSelector((state) => state.product.getDetailProductFail);
  const dispatch = useDispatch();

  const requestDetailProduct = () => {
    dispatch(getDetailProductLoading());
    dispatch(getDetailProduct(id));
  };

  return { isDetailProductLoading, requestDetailProductFail, detailProduct, requestDetailProduct };
};
