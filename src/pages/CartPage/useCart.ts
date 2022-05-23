import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { StoreState } from '../../types';

const useCart = () => {
  const dispatch = useDispatch();

  const { isLoading, error, cart, cartItems } = useSelector(
    (state: StoreState) => ({
      isLoading: state.isLoading,
      error: state.error,
      cart: state.cart,
      cartItems: state.cartItems,
    })
  );

  const joinedCart = cart.map((item) => ({
    ...item,
    product: cartItems.find((product) => product.id === item.id),
  }));

  const cartItemIdList = cart.map((item) => item.id);

  useEffect(() => {
    dispatch(actions.getCartItems(cartItemIdList));
  }, [cartItemIdList, dispatch]);

  return {
    isLoading,
    error,
    cart: joinedCart,
    totalPrice: joinedCart
      .filter((item) => item.checked)
      .reduce((totalPrice, item) => {
        const currentPrice = item.product
          ? item.product.price * Number(item.quantity)
          : 0;

        return totalPrice + currentPrice;
      }, 0),
    handleChangeQuantity:
      (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.handleChangeQuantity(id, e.target.value));
      },
    handleCheck: (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.handleCheck(id, e.target.checked));
    },
    handleCheckAll: (e: React.ChangeEvent<HTMLInputElement>) => {
      cart.forEach((item) => {
        dispatch(actions.handleCheck(item.id, e.target.checked));
      });
    },
    removeCartItem: (id: string | Array<string>) => () => {
      dispatch(actions.removeCartItem(id));
    },
    removeAllCartItem: () => {
      dispatch(
        actions.removeCartItem(
          cart.filter((item) => item.checked).map((item) => item.id)
        )
      );
    },
  };
};

export default useCart;
