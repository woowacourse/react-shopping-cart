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

export const useHandleProduct = (id: number) => {
  const newQuantity = useRecoilValue(updateCartSelector({ id }));

  const updateCart = useRecoilCallback(({ set }) => ({ id, quantity }: SelectorParams) => {
    set(updateCartSelector({ id, quantity }), 0);
  });

  const removeProductItemFromCart = useRecoilCallback(({ set }) => (id: number) => {
    set(removeProductItemFromCartSelector(id), []);
  });

  const handleCartClick = () => {
    fetch(CART_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { id, quantity } = data;
        updateCart({ id, quantity });
      });
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (value === '00' && Number(value) === NONE_QUANTITY) {
      removeProductItemFromCart(id);
      return;
    }

    const newQuantity = changeInvalidValueToBlank(value, NOT_NUMBER);

    fetch(`${CART_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, quantity: newQuantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { id, quantity } = data;
        updateCart({ id, quantity });
      })
      .catch((error) => console.error(error));
  };

  const handleIncreaseItem = () => {
    const newValue = newQuantity + 1;
    if (!validateQuantityInput(newValue)) return;

    fetch(`${CART_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, quantity: newValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { id, quantity } = data;
        updateCart({ id, quantity });
      })
      .catch((error) => console.error(error));
  };

  const handleDecreaseItem = () => {
    const newValue = newQuantity - 1;
    if (!validateQuantityInput(newValue)) return;

    if (newValue === NONE_QUANTITY) {
      handleRemoveProductItem();
      return;
    }

    fetch(`${CART_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, quantity: newValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { id, quantity } = data;
        updateCart({ id, quantity });
      })
      .catch((error) => console.error(error));
  };

  const handleRemoveProductItem = () => {
    fetch(`${CART_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then(() => {
        removeProductItemFromCart(id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 리팩터링 필수
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
