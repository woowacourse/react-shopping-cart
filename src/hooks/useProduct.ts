import { ChangeEventHandler, FocusEventHandler } from 'react';
import { NONE_QUANTITY, NOT_NUMBER } from '../constants';
import { changeInvalidValueToBlank } from '../utils/changeInvalidValueToBlank';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  SelectorParams,
  updateCartSelector,
  removeProductItemFromCartSelector,
} from '../store/CartSelector';
import { validateQuantityInput } from '../utils/validateQuantityInput';
import { CART_BASE_URL } from '../constants/url';
import { useFetchData } from './useFetchData';

export const useProduct = (id: number) => {
  const newQuantity = useRecoilValue(updateCartSelector({ id }));

  const updateCart = useRecoilCallback(({ set }) => ({ id, quantity }: SelectorParams) => {
    set(updateCartSelector({ id, quantity }), 0);
  });

  const removeProductItemFromCart = useRecoilCallback(({ set }) => (id: number) => {
    set(removeProductItemFromCartSelector(id), []);
  });

  const { api } = useFetchData();

  const removeItem = () => {
    api.delete(`${CART_BASE_URL}/${id}`, { id });
    removeProductItemFromCart(id);
  };

  const updateItem = (quantity: number) => {
    api.patch(`${CART_BASE_URL}/${id}`, { id, quantity });
    updateCart({ id, quantity });
  };

  const handleCartClick = () => {
    api.post(CART_BASE_URL, { id });
    updateCart({ id, quantity: 1 });
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (value === '00' && Number(value) === NONE_QUANTITY) {
      removeItem();
      return;
    }

    const newQuantity = changeInvalidValueToBlank(value, NOT_NUMBER);

    updateItem(newQuantity);
  };

  const handleIncreaseItem = () => {
    const newValue = newQuantity + 1;
    if (!validateQuantityInput(newValue)) return;

    updateItem(newValue);
  };

  const handleDecreaseItem = () => {
    const newValue = newQuantity - 1;
    if (!validateQuantityInput(newValue)) return;

    if (newValue === NONE_QUANTITY) {
      removeItem();
      return;
    }

    updateItem(newValue);
  };

  const handleDecreaseCartItem = () => {
    if (newQuantity === 1) return;

    const newValue = newQuantity - 1;
    if (!validateQuantityInput(newValue)) return;

    updateItem(newValue);
  };

  const handleBlurItem: FocusEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (value === '0') {
      removeItem();
    }
  };

  return {
    newQuantity,
    handleNumberInputChange,
    handleIncreaseItem,
    handleDecreaseItem,
    handleDecreaseCartItem,
    handleCartClick,
    handleBlurItem,
    removeItem,
  };
};
