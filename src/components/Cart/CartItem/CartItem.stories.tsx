import { Meta } from '@storybook/react';
import { Cart } from 'types';
import CartItem from '.';

const cartItem = {
  component: CartItem,
  title: 'Cart/CartItem',
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof CartItem>;

export default cartItem;

const mock: Cart = {
  id: 1,
  quantity: 2,
  product: {
    id: 1,
    price: 8000,
    name: '춘식이 아이템',
    imageUrl:
      'https://pbs.twimg.com/profile_images/1641252178450083841/Cn2MUfHG_400x400.jpg',
  },
};

const Template = () => {
  return <CartItem cartItem={mock} />;
};

export const Default = Template.bind({});
