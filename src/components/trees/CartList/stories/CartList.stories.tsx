import type { StoryFn } from '@storybook/react';
import CartList from '../CartList';

export default {
  title: 'CartList',
  component: CartList,
};

const Template: StoryFn<React.ComponentProps<typeof CartList>> = (props) => <CartList {...props} />;

export const DefaultCartList = Template.bind({});
DefaultCartList.args = {
  cartItems: [
    {
      id: 1,
      quantity: 5,
      product: {
        id: 1,
        price: 10000,
        name: '치킨',
        imageUrl: 'http://example.com/chicken.jpg',
      },
    },
    {
      id: 2,
      quantity: 1,
      product: {
        id: 2,
        price: 20000,
        name: '피자',
        imageUrl: 'http://example.com/pizza.jpg',
      },
    },
  ],
};
