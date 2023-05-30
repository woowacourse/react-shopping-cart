import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  cartItemQuantityStateFamily,
  cartState,
} from '../../atoms/CartListState';
import { productItemStateFamily } from '../../atoms/ProductListState';
import { useCallback } from 'react';
import { parseToCartFormat } from '../../services/parseToCartFormat';
import { checkboxesState } from '../../atoms/CheckboxState';
import { deleteCartItem, patchCartItemQuantity, postCartItem } from '../../api';
import { ERROR_MESSAGE } from '../../constants';

export const useCartState = (id: number) => {
  const productItem = useRecoilValue(productItemStateFamily(id));
  const quantity = useRecoilValue(cartItemQuantityStateFamily(id));
  const setCartStates = useSetRecoilState(cartState);
  const setCheckboxes = useSetRecoilState(checkboxesState);

  const handleAddCartState = useCallback(async () => {
    try {
      await postCartItem(id);

      setCartStates((prevCartStates) => [
        ...prevCartStates,
        parseToCartFormat(id, productItem),
      ]);
    } catch {
      alert(ERROR_MESSAGE.postToCart);
    }
  }, []);

  const handleDeleteCartState = useCallback(async () => {
    try {
      await deleteCartItem(id);

      setCartStates((prevCartStates) =>
        prevCartStates.filter((product) => product.id !== id)
      );

      setCheckboxes((prevState) =>
        prevState.filter((checkbox) => checkbox.id !== id)
      );
    } catch {
      alert(ERROR_MESSAGE.deleteCartItem);
    }
  }, []);

  const increaseProductCount = useCallback(async () => {
    try {
      await patchCartItemQuantity(id, quantity + 1);

      setCartStates((prevCartStates) =>
        prevCartStates.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );

      setCheckboxes((prevState) =>
        prevState.map((checkbox) =>
          checkbox.id === id
            ? { ...checkbox, quantity: checkbox.quantity + 1 }
            : checkbox
        )
      );
    } catch {
      alert(ERROR_MESSAGE.patchCartItem);
    }
  }, [quantity]);

  const decreaseProductCount = useCallback(async () => {
    try {
      await patchCartItemQuantity(id, quantity - 1);

      setCartStates((prevCartStates) =>
        prevCartStates.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );

      setCheckboxes((prevState) =>
        prevState.map((checkbox) =>
          checkbox.id === id
            ? { ...checkbox, quantity: checkbox.quantity - 1 }
            : checkbox
        )
      );
    } catch {
      alert(ERROR_MESSAGE.patchCartItem);
    }
  }, [quantity]);

  return {
    quantity,
    handleAddCartState,
    handleDeleteCartState,
    increaseProductCount,
    decreaseProductCount,
  };
};
