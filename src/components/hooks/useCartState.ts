import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartQuantityState, cartState } from '../../atoms/CartState';
import { productItemStateFamily } from '../../atoms/ProductItemState';
import { useCallback, useState } from 'react';

export const useCartState = (id: number) => {
  const productItem = useRecoilValue(productItemStateFamily(id));
  // const setCartStates = useSetRecoilState(cartState);
  // const cartQuantities = useRecoilValue(cartState);
  const [cartStates, setCartStates] = useRecoilState(cartState);
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddCartState = () => {
    setQuantity(quantity + 1);

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

    setQuantity(quantity + 1);
  }, [quantity]);

  const decreaseProductCount = useCallback(() => {
    setCartStates((prevCartStates) =>
      prevCartStates.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );

    setQuantity(quantity - 1);
  }, [quantity]);

  return {
    quantity,
    handleAddCartState,
    handleDeleteCartState,
    increaseProductCount,
    decreaseProductCount,
  };
};
