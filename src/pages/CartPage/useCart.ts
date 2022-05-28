import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { StoreState } from '../../types';

type SelectedState = StoreState['cartState'];

const useCart = () => {
  const dispatch = useDispatch();
  const { isLoading, error, cart } = useSelector<StoreState, SelectedState>(
    ({ cartState }) => ({
      isLoading: cartState.isLoading,
      error: cartState.error,
      cart: cartState.cart,
    })
  );
  const [checkedFlags, setCheckedFlags] = useState<Record<string, boolean>>({});
  const totalPrice = useMemo(
    () =>
      cart
        .filter(({ product }) => checkedFlags[product.id] ?? true)
        .reduce(
          (totalPrice, { product, quantity }) =>
            totalPrice + product.price * Number(quantity),
          0
        ),
    [cart, checkedFlags]
  );

  const handleChangeQuantity =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.updateQuantity(id, e.target.value));
    };

  const handleCheck =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedFlags((prev) => ({ ...prev, [id]: e.target.checked }));
    };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFlags((prev) => {
      const updated = {} as Record<string, boolean>;

      cart.forEach(({ product }) => {
        updated[product.id] = e.target.checked;
      });

      return updated;
    });
  };

  const removeCartItem = (id: string | Array<string>) => () => {
    dispatch(actions.removeCartItem(id));
  };

  const removeAllCartItem = () => {
    const productIdList = cart
      .filter(({ checked }) => checked)
      .map(({ product }) => product.id);
    dispatch(actions.removeCartItem(productIdList));
  };

  useEffect(() => {
    dispatch(actions.getCart());
  }, [dispatch]);

  return {
    isLoading,
    error,
    cart,
    checkedFlags,
    totalPrice,
    handleChangeQuantity,
    handleCheck,
    handleCheckAll,
    removeCartItem,
    removeAllCartItem,
  };
};

export default useCart;
