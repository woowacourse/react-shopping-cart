import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSnackbar } from 'notistack';
import { RootState } from 'modules/store';
import { useAppSelector } from 'modules/hooks';
import { CartState, getCartItems, addCartItem as addCartItemRequest } from 'modules/cartSlice';
import MESSAGE from 'constants/messages';
import * as T from 'types';

const useAddCartItem = () => {
  const cartItems: CartState['cartItems'] = useAppSelector((state) => state.cartSlice.cartItems);
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const addCartItem = (product: T.Product, isLoading?: boolean) => {
    if (isLoading || cartItems.status !== T.AsyncStatus.SUCCESS) return;

    const cartItemIds = cartItems.data.map((cartItem) => cartItem.productId);

    if (cartItemIds.includes(product.productId)) {
      enqueueSnackbar(MESSAGE.EXIST_CART_ITEM);
      return;
    }

    dispatch(addCartItemRequest(product))
      .then(() => {
        enqueueSnackbar(MESSAGE.ADDED_CART_ITEM_SUCCESS);
      })
      .catch((error: Error) => {
        enqueueSnackbar(error.message);
      });
  };

  return addCartItem;
};

export default useAddCartItem;
