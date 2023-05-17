import type { StoryFn } from '@storybook/react';
import CartList from '../CartList';
import mockCartItems from '../../../../../public/assets/mockCartItems.json';

export default {
  title: 'CartList',
  component: CartList,
};

const Template: StoryFn<React.ComponentProps<typeof CartList>> = (props) => <CartList {...props} />;

export const DefaultCartList = Template.bind({});
DefaultCartList.args = {
  cartItems: mockCartItems,
};
