import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { productIds, updateCart } from 'src/recoil/cartList';
import { Product } from 'src/types';

const useProductSelect = (product: Product) => {
  const [isFirst, setIsFirst] = useState(false);
  const setProductIds = useSetRecoilState(productIds);
  const [cartItem, setCartItem] = useRecoilState(updateCart(product.id));

  const onSelectItem: React.MouseEventHandler<SVGElement> = () => {
    setCartItem({ id:product.id , quantity: 1, product });
    setProductIds((prev) => [...prev, product.id]);
    setIsFirst(true);
  };

  const add: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;
    setCartItem({ ...cartItem, quantity: cartItem.quantity + 1 });
  };

  const remove: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;

    if (cartItem.quantity === 1) {
      setIsFirst(false);
      setProductIds((prev) => 
        prev.filter(id => id !== cartItem.id)
      );
    }
    setCartItem({ ...cartItem, quantity: cartItem.quantity - 1 });
  };

  return { currentCartItem: cartItem, remove, add, onSelectItem, isFirst };
};

export default useProductSelect;
