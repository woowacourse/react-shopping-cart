import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSnackbar } from 'notistack';
import { RootState } from 'modules';
import { CartState } from 'modules/cartItems/reducers';
import { addCartItemRequest, getCartItemsRequest } from 'modules/cartItems/actions';
import * as T from 'types';
import MESSAGE from 'constants/messages';

const useAddCartItem = () => {
  const cartItems: CartState['cartItems'] = useSelector((state: RootState) => state.cartReducer.cartItems);
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getCartItemsRequest());
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
