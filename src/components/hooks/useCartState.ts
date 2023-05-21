import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  cartItemQuantityStateFamily,
  cartState,
} from '../../atoms/CartListState';
import { productItemStateFamily } from '../../atoms/ProductListState';
import { useCallback } from 'react';
import { parseToCartFormat } from '../../services/parseToCartFormat';

export const useCartState = (id: number) => {
  const productItem = useRecoilValue(productItemStateFamily(id));
  const quantity = useRecoilValue(cartItemQuantityStateFamily(id));
  const setCartStates = useSetRecoilState(cartState);

  const handleAddCartState = useCallback(() => {
    const addCartItem = async () => {
      const response = await fetch('/api/carts', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
        }),
      });

      if (response.status >= 400) {
        throw new Error('이미 장바구니에 담긴 품목입니다.');
      }
    };

    addCartItem();

    setCartStates((prevCartStates) => [
      ...prevCartStates,
      parseToCartFormat(id, productItem),
    ]);
  }, []);

  const handleDeleteCartState = useCallback(() => {
    const deleteCartProduct = async () => {
      const response = await fetch(`/cart-items/${id}`, {
        method: 'DELETE',
      });

      if (response.status >= 400) {
        throw new Error('장바구니에 없는 품목을 삭제할 수 없습니다.');
      }
    };

    deleteCartProduct();

    setCartStates((prevCartStates) =>
      prevCartStates.filter((product) => product.id !== id)
    );
  }, []);

  const increaseProductCount = useCallback(() => {
    const patchCartItemQuantity = async () => {
      const response = await fetch(`/cart-items/${id}`, {
        method: 'PATCH',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({
          quantity: quantity + 1,
        }),
      });

      if (response.status >= 400) {
        throw new Error('장바구니 수량을 수정할 수 없습니다.');
      }
    };

    patchCartItemQuantity();

    setCartStates((prevCartStates) =>
      prevCartStates.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  }, [quantity]);

  const decreaseProductCount = useCallback(() => {
    const patchCartItemQuantity = async () => {
      const response = await fetch(`/cart-items/${id}`, {
        method: 'PATCH',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({
          quantity: quantity - 1,
        }),
      });

      if (response.status >= 400) {
        throw new Error('장바구니 수량을 수정할 수 없습니다.');
      }
    };

    patchCartItemQuantity();

    setCartStates((prevCartStates) =>
      prevCartStates.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  }, [quantity]);

  return {
    quantity,
    handleAddCartState,
    handleDeleteCartState,
    increaseProductCount,
    decreaseProductCount,
  };
};
