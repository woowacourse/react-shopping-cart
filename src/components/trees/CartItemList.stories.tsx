import type { StoryFn } from '@storybook/react';

import CartItemList from './CartItemList';

export default {
  title: 'CartItemList',
  component: CartItemList,
};

const Template: StoryFn<React.ComponentProps<typeof CartItemList>> = () => {
  return <CartItemList />;
};

export const Controls = Template.bind({});
Controls.args = {};
