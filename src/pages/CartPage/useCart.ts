import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { StoreState } from '../../types';

const useCart = () => {
  const dispatch = useDispatch();

  const { userId, isLoading, error, cart } = useSelector(
    (state: StoreState) => ({
      userId: '1',
      isLoading: state.isLoading,
      error: state.error,
      cart: state.cart,
    })
  );

  console.log(cart);
  const [checkedFlags, setCheckedFlags] = useState<Record<string, boolean>>({});

  useEffect(() => {
    dispatch(actions.getCart(userId));
  }, [dispatch, userId]);

  return {
    isLoading,
    error,
    cart,
    checkedFlags,
    totalPrice: cart
      .filter(({ product }) => checkedFlags[product.id] ?? true)
      .reduce(
        (totalPrice, { product, quantity }) =>
          totalPrice + product.price * Number(quantity),
        0
      ),
    handleChangeQuantity:
      (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.updateQuantity(userId, id, e.target.value));
      },
    handleCheck: (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedFlags((prev) => ({ ...prev, [id]: e.target.checked }));
    },
    handleCheckAll: (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedFlags((prev) => {
        const updated = {} as Record<string, boolean>;

        cart.forEach(({ product }) => {
          updated[product.id] = e.target.checked;
        });

        return updated;
      });
    },
    removeCartItem: (id: string | Array<string>) => () => {
      dispatch(actions.removeCartItem(userId, id));
    },
    removeAllCartItem: () => {
      const productIdList = cart
        .filter(({ checked }) => checked)
        .map(({ product }) => product.id);
      dispatch(actions.removeCartItem(userId, productIdList));
    },
  };
};

export default useCart;
