import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { deleteCartItem, postCartItem, updateCartItem } from '../api/cartList';
import { cartAtom, cartSelectorFamily } from '../store/cart';
import { Product } from '../types/product';

const useCartAtom = (id: number, product?: Product) => {
  let name: string;
  let imageUrl: string;
  let price: number;

  if (product) {
    name = product.name;
    imageUrl = product.imageUrl;
    price = product.price;
  }

  const setCart = useSetRecoilState(cartAtom);
  const productInCart = useRecoilValue(cartSelectorFamily(id));
  const [count, setCount] = useState(productInCart?.quantity);

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
    updateCartItem(id, count);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: count + 1 } : item
      )
    );
  };

  const minusOne = () => {
    setCount(count - 1);

    if (count - 1 === 0) {
      deleteCartItem(id);
      removeCartItemFromAtom();
      return;
    }
    updateCartItem(id, count - 2);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: count - 1 } : item
      )
    );
  };

  const minusOneWhenOverOne = () => {
    if (count - 1 === 0) {
      setCount(1);
      return;
    }
    updateCartItem(id, count - 2);
    setCount(count);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: count - 1 } : item
      )
    );
  };

  const removeCartItemFromAtom = () => {
    setCart((prev) => [...prev.filter((item) => item.id !== id)]);
  };

  return {
    count,
    productInCart,
    addToCart,
    plusOne,
    minusOne,
    removeCartItemFromAtom,
    minusOneWhenOverOne,
  };
};

export default useCartAtom;
