import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { StoreState } from '../../types';

const useProductDetail = (id: string) => {
  const dispatch = useDispatch();
  const { userId, isLoading, productDetail, error, cart } = useSelector(
    (state: StoreState) => ({
      userId: state.userId,
      isLoading: state.isLoading,
      productDetail: state.productDetail,
      error: state.error,
      cart: state.cart,
    })
  );

  useEffect(() => {
    if (id) {
      dispatch(actions.getProductDetail(id));
    }
  }, [id, dispatch]);

  return {
    isLoading,
    productDetail,
    error,
    isAlreadyAdded: !!cart.find(({ product }) => product.id === id),
    addItemToCart: () => {
      dispatch(actions.addItemToCart(userId, id, 1));
    },
  };
};

export default useProductDetail;
