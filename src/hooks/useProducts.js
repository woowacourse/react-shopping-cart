import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPE, ROUTE } from '../constants';
import { fetchCarts } from '../service/carts';
import {
  fetchProducts,
  fetchProductDetail,
  addItemToCart,
} from '../service/products';
import useCarts from './useCarts';
import useLoading from './useLoading';

const useProducts = () => {
  const dispatch = useDispatch();
  const { show } = useLoading();
  const { cartItems } = useCarts();
  const products = useSelector(state => state.product.product.fetchedProducts);
  const product = useSelector(state => state.product.product.productDetail);

  const updateProductState = () => dispatch(fetchProducts());
  const updateCartState = () => dispatch(fetchCarts());
  const updateProductDetail = match => dispatch(fetchProductDetail(match));

  const resetProductDetail = () =>
    dispatch({ type: ACTION_TYPE.PRODUCTS.RESET_PRODUCT_DETAIL });

  const updateProductURL = () =>
    dispatch({ type: ACTION_TYPE.URL.GET_URL, payload: ROUTE.HOME });

  const updateProductDetailURL = () => {
    dispatch({ type: ACTION_TYPE.URL.GET_URL, payload: ROUTE.PRODUCT_DETAILS });
  };

  const addToCart = product => {
    addItemToCart(product, cartItems, dispatch);
    show();
  };

  return {
    product,
    products,
    cartItems,
    updateProductState,
    updateCartState,
    updateProductDetail,
    resetProductDetail,
    updateProductURL,
    updateProductDetailURL,
    addToCart,
  };
};

export default useProducts;
