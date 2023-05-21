import { Meta } from '@storybook/react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { GlobalStyle } from '../GlobalStyle';
import { CartItemsSection } from '../components/cartPage/cartItemsSection/CartItemsSection';
import { CartProductDetail, cartItemsState } from '../recoil/atoms/cartAtom';
import { useEffect } from 'react';
import { useMockData } from '../hooks/useMockData';

const meta = {
  title: 'CartItems',
  component: CartItemsSection,
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <Story />
          <GlobalStyle />
        </RecoilRoot>
      );
    },
  ],
} as Meta;

export default meta;

export const CartItemsComponent = () => {
  const setCartItems = useSetRecoilState(cartItemsState);
  const { mockData } = useMockData();

  useEffect(() => {
    setCartItems(() => {
      const cartItems: CartProductDetail[] = [];

      Array.from({ length: 5 }).forEach((_, index) => {
        cartItems.push({
          id: index,
          quantity: Math.round(Math.random() * 10) + 1,
          product: mockData[index],
        });
      });

      console.log(cartItems);

      return cartItems;
    });
  }, []);

  return <CartItemsSection />;
};
