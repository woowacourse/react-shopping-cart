import { ChangeEventHandler, FocusEventHandler } from 'react';

import { INITIAL_QUANTITY, NONE_QUANTITY, NOT_NUMBER } from '../constants';
import { changeInvalidValueToBlank } from '../utils/changeInvalidValueToBlank';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  SelectorParams,
  updateCartSelector,
  removeProductItemFromCartSelector,
} from '../store/CartSelector';

import { validateQuantityInput } from '../utils/validateQuantityInput';

export const useHandleProduct = (id: number) => {
  const newQuantity = useRecoilValue(updateCartSelector({ id }));

  const updateCart = useRecoilCallback(({ set }) => ({ id, quantity }: SelectorParams) => {
    set(updateCartSelector({ id, quantity }), 0);
  });

  const removeProductItemFromCart = useRecoilCallback(({ set }) => (id: number) => {
    set(removeProductItemFromCartSelector(id), []);
  });

  const handleCartClick = () => {
    updateCart({ id, quantity: INITIAL_QUANTITY });
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (value === '00' && Number(value) === NONE_QUANTITY) {
      removeProductItemFromCart(id);
      return;
    }

    const newQuantity = changeInvalidValueToBlank(value, NOT_NUMBER);
    updateCart({ id, quantity: newQuantity });
  };

  const handleIncreaseItem = () => {
    const newValue = newQuantity + 1;
    if (!validateQuantityInput(newValue)) return;

    updateCart({ id, quantity: newValue });
  };

  const handleDecreaseItem = () => {
    const newValue = newQuantity - 1;
    if (!validateQuantityInput(newValue)) return;

    if (newValue === NONE_QUANTITY) {
      removeProductItemFromCart(id);
      return;
    }

    updateCart({ id, quantity: newValue });
  };

  const handleDecreaseCartItem = () => {
    if (newQuantity === 1) return;
    const newValue = newQuantity - 1;
    if (!validateQuantityInput(newValue)) return;

    updateCart({ id, quantity: newValue });
  };

  const handleBlurItem: FocusEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;
    if (value === '0') {
      removeProductItemFromCart(id);
    }
  };

  const removeFromCart = () => {
    removeProductItemFromCart(id);
  };

  return {
    newQuantity,
    handleNumberInputChange,
    handleIncreaseItem,
    handleDecreaseItem,
    handleDecreaseCartItem,
    handleCartClick,
    handleBlurItem,
    removeFromCart,
  };
};
