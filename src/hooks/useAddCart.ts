import MESSAGE from 'constants/messages';
import { RootState } from 'modules';
import { addCartItemRequest, getCartItemsRequest } from 'modules/cartItems/actions';
import { CartState } from 'modules/cartItems/reducers';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AsyncStatus, Product } from 'types';

const useAddCart = () => {
  const cartItems: CartState['cartItems'] = useSelector((state: RootState) => state.cartReducer.cartItems);
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getCartItemsRequest());
  }, [dispatch]);

  const addCart = (product: Product) => {
    if (cartItems.status !== AsyncStatus.SUCCESS) return;

    const cartItemIds = cartItems.data.map((cartItem) => cartItem.product.id);

    if (cartItemIds.includes(product.id)) {
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

  return addCart;
};

export default useAddCart;
