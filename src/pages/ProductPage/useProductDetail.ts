import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { StoreState } from '../../types';

const useProductDetail = (id: string) => {
  const dispatch = useDispatch();
  const { isLoading, productDetail, error, cart } = useSelector(
    (state: StoreState) => ({
      isLoading: state.isLoading,
      productDetail: state.productDetail,
      error: state.error,
      cart: state.cart,
    })
  );
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
