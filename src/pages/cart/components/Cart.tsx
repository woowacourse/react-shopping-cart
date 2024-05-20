import { allCartItemStates } from '@/store/atoms';
import { PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';
import { CartContext } from '../context/CartContext';
import CartTotals from './CartTotals';
import CartList from './CartList';
import CartTitle from './CartTitle';
import CartWrapper from './CartWrapper';

export const Cart = ({ children }: PropsWithChildren<object>) => {
  const cartItems = useRecoilValue(allCartItemStates);

  return (
    <CartContext.Provider value={{ allCartItems: cartItems }}>
      <>{children}</>
    </CartContext.Provider>
  );
};

Cart.Title = CartTitle;
Cart.Result = CartTotals;
Cart.List = CartList;
Cart.Wrapper = CartWrapper;
