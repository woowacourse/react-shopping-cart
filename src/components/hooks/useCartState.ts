import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartItemQuantityStateFamily, cartState } from '../../atoms/CartState';
import { productItemStateFamily } from '../../atoms/ProductItemState';
import { useCallback } from 'react';

export const useCartState = (id: number) => {
  const productItem = useRecoilValue(productItemStateFamily(id));
  const quantity = useRecoilValue(cartItemQuantityStateFamily(id));
  const setCartStates = useSetRecoilState(cartState);

  const handleAddCartState = () => {
    setCartStates((prevCartStates) => {
      if (
        prevCartStates.length !== 0 &&
        prevCartStates
          .map((cartItem) => (cartItem.id === id ? true : false))
          .includes(true)
      ) {
        return [...prevCartStates];
      }

      return [
        ...prevCartStates,
        {
          id,
          quantity: 1,
          product: productItem,
        },
      ];
    });
  };

  const handleDeleteCartState = () => {
    setCartStates((prevCartStates) =>
      prevCartStates.filter((product) => product.id !== id)
    );
  };

  const increaseProductCount = useCallback(() => {
    setCartStates((prevCartStates) =>
      prevCartStates.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  }, [quantity]);

  const decreaseProductCount = useCallback(() => {
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
