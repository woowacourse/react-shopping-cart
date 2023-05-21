import type { Meta, StoryObj } from '@storybook/react';
import CartItem from './CartItem';
import CheckedCartListProvider from '../../../provider/CheckedListProvider';
import { cartHandler } from '../../../mocks/handlers';

const MockCartItem = () => {
  const cartItem = {
    id: '1',
    quantity: 1,
    product: {
      id: 0,
      name: '순살치킨 1KG',
      price: 9900,
      imageSrc:
        'https://cdn-mart.baemin.com/sellergoods/main/c6f2f083-a8b8-4799-834b-444b5eaeb532.png?h=400&w=400',
    },
  };

  return (
    <CheckedCartListProvider>
      <CartItem cartItem={cartItem} />
    </CheckedCartListProvider>
  );
};

const meta = {
  title: 'CartItem',
  component: MockCartItem,
  tags: ['autodocs'],
  parameters: { msw: cartHandler },
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
