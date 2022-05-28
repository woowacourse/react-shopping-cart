import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { StoreState } from '../../types';

type SelectedState = {
  isLoading: StoreState['productsState']['isLoading'];
  error: StoreState['productsState']['error'];
  productDetail: StoreState['productsState']['productDetail'];
  cart: StoreState['cartState']['cart'];
};

const useProductDetail = (id: string) => {
  const dispatch = useDispatch();
  const { isLoading, error, productDetail, cart } = useSelector<
    StoreState,
    SelectedState
  >(({ productsState, cartState }) => ({
    isLoading: productsState.isLoading,
    productDetail: productsState.productDetail,
    error: productsState.error,
    cart: cartState.cart,
  }));
  const isAlreadyAdded = useMemo(
    () => !!cart.find(({ product }) => product.id === id),
    [cart, id]
  );

  const addItemToCart = () => {
    dispatch(actions.addItemToCart(id, 1));
  };

  useEffect(() => {
    if (id) {
      dispatch(actions.getProductDetail(id));
    }
  }, [id, dispatch]);

  return {
    isLoading,
    productDetail,
    error,
    isAlreadyAdded,
    addItemToCart,
  };
};

export default useProductDetail;
