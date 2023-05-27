import { ChangeEventHandler, FocusEventHandler } from 'react';
import { NONE_QUANTITY, NOT_NUMBER, USER } from '../constants';
import { changeInvalidValueToBlank } from '../utils/changeInvalidValueToBlank';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  SelectorParams,
  updateCartSelector,
  removeProductItemFromCartSelector,
} from '../store/CartSelector';
import { validateQuantityInput } from '../utils/validateQuantityInput';
import { CART_BASE_URL } from '../constants/url';
import useMutation from './useMutation';

export const useProduct = (id: number) => {
  const newQuantity = useRecoilValue(updateCartSelector({ id }));

  const updateCart = useRecoilCallback(({ set }) => ({ id, quantity }: SelectorParams) => {
    set(updateCartSelector({ id, quantity }), 0);
  });

  const removeProductItemFromCart = useRecoilCallback(({ set }) => (id: number) => {
    set(removeProductItemFromCartSelector(id), []);
  });

  const { mutate, error } = useMutation();

  const removeItem = () => {
    mutate({
      url: `${CART_BASE_URL}/${id}`,
      method: 'DELETE',
      bodyData: { id },
      headers: {
        Authorization: `Basic ${btoa(USER)}`,
        'Content-Type': 'application/json',
      },
    });
    if (error) return;
    removeProductItemFromCart(id);
  };

  const updateItem = (quantity: number) => {
    mutate({
      url: `${CART_BASE_URL}/${id}`,
      method: 'PATCH',
      bodyData: { id, quantity },
      headers: {
        Authorization: `Basic ${btoa(USER)}`,
        'Content-Type': 'application/json',
      },
    });
    if (error) return;
    updateCart({ id, quantity });
  };

  const addItemToCart = () => {
    mutate({
      url: `${CART_BASE_URL}`,
      method: 'POST',
      bodyData: { id },
      headers: {
        Authorization: `Basic ${btoa(USER)}`,
        'Content-Type': 'application/json',
      },
    });
    if (error) return;
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
    addItemToCart,
    handleBlurItem,
    removeItem,
  };
};
