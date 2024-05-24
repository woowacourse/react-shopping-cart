import { PropsWithChildren } from 'react';
import { CartContext } from '../context/CartContext';
import CartTotals from './CartTotals';
import CartList from './CartList';
import CartTitle from './CartTitle';
import { useCartManager } from '@/store/custom/useCartManager';

export const Cart = ({ children }: PropsWithChildren<object>) => {
  const { totalCartItems } = useCartManager();

  return (
    <CartContext.Provider value={{ allCartItems: totalCartItems }}>
      <>{children}</>
    </CartContext.Provider>
  );
};

Cart.Title = CartTitle;
Cart.Result = CartTotals;
Cart.List = CartList;
