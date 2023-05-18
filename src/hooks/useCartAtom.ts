import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { deleteCartItem, postCartItem, updateCartItem } from '../api/cartList';
import { cartAtom, cartSelectorFamily } from '../store/cart';

const useCartAtom = (id: number) => {
  const setCart = useSetRecoilState(cartAtom);
  const productInCart = useRecoilValue(cartSelectorFamily(id));
  const [count, setCount] = useState(productInCart?.quantity);

  let name: string = '';
  let imageUrl: string = '';
  let price: number = 0;

  if (productInCart) {
    ({ name, imageUrl, price } = productInCart.product);
  }

  const addToCart = () => {
    setCount(1);
    postCartItem(id);
    setCart((prev) => [
      ...prev,
      { id, quantity: 1, product: { id, name, price, imageUrl } },
    ]);
  };

  const plusOne = () => {
    setCount(count + 1);
    updateCartItem(id, count + 1);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { id, quantity: count + 1, product: { id, name, price, imageUrl } }
          : item
      )
    );
  };

  const removeCartItemFromAtom = () => {
    setCart((prev) => [...prev.filter((item) => item.id !== id)]);
  };

  const minusOne = () => {
    setCount(count - 1);

    if (count - 1 === 0) {
      deleteCartItem(id);
      removeCartItemFromAtom();
      return;
    }
    updateCartItem(id, count - 1);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { id, quantity: count - 1, product: { id, name, price, imageUrl } }
          : item
      )
    );
  };

  const minusOneWhenOverOne = () => {
    if (count - 1 === 0) {
      setCount(1);
      return;
    }
    setCount(count - 1);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { id, quantity: count - 1, product: { id, name, price, imageUrl } }
          : item
      )
    );
  };

  return {
    count,
    productInCart,
    addToCart,
    plusOne,
    minusOne,
    minusOneWhenOverOne,
    removeCartItemFromAtom,
  };
};

export default useCartAtom;
