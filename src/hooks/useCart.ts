import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../states';
import { getCart } from '../states/actions/cart';
import { CartAction } from '../states/actionTypes/cart';
import {
  addCartItem as _addCartItem,
  deleteCartItem as _deleteCartItem,
  changeCartItemQuantity as _changeCartItemQuantity,
  selectCartItem as _selectCartItem,
  selectAllCartItems as _selectAllCartItems,
} from './../states/actions/cart';

const useCart = () => {
  const { cart, loading, loadingError, error: cartError } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<ThunkDispatch<RootState, null, CartAction>>();

  useEffect(() => {
    if (cart.length !== 0) return;

    dispatch(getCart());
  }, [dispatch]);

  const addCartItem = async (product: Product) => {
    await dispatch(_addCartItem(product));
  };

  const deleteCartItem = async (cartItem: CartItem) => {
    await dispatch(_deleteCartItem(cartItem));
  };

  const changeCartItemQuantity = (productId: CartItem['productId'], quantity: string) => {
    dispatch(_changeCartItemQuantity(productId, quantity));
  };

  const selectCartItem = (productId: CartItem['productId']) => {
    dispatch(_selectCartItem(productId));
  };

  const selectAllCartItems = (isSelectAll: boolean) => {
    dispatch(_selectAllCartItems(isSelectAll));
  };

  return {
    cart,
    addCartItem,
    deleteCartItem,
    changeCartItemQuantity,
    selectCartItem,
    selectAllCartItems,
    loading,
    loadingError,
    cartError,
  };
};

export default useCart;
