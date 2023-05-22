import type { Meta, StoryObj } from '@storybook/react';
import PaymentAmount from './PaymentAmount';
import CheckedCartListProvider from '../../../provider/CheckedListProvider';
import { useSetRecoilState } from 'recoil';
import cartState from '../../../globalState/atoms/cartState';

const MockPaymentAmount = () => {
  const setCartState = useSetRecoilState(cartState);
  setCartState([
    {
      id: '0',
      quantity: 1,
      product: {
        id: 0,
        name: '순살치킨 1KG',
        price: 9900,
        imageSrc:
          'https://cdn-mart.baemin.com/sellergoods/main/c6f2f083-a8b8-4799-834b-444b5eaeb532.png?h=400&w=400',
      },
    },
    {
      id: '1',
      quantity: 2,
      product: {
        id: 1,
        name: '리코스 나초칩 454g',
        price: 6200,
        imageSrc:
          'https://cdn-mart.baemin.com/sellergoods/main/bf308ce9-cbe5-45a0-808a-4fdda168f992.jpg?h=400&w=400',
      },
    },
  ]);
  return (
    <CheckedCartListProvider>
      <PaymentAmount />
    </CheckedCartListProvider>
  );
};

const meta = {
  title: 'PaymentAmount',
  component: MockPaymentAmount,
  tags: ['autodocs'],
} satisfies Meta<typeof PaymentAmount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
