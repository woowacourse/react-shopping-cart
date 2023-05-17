import type { StoryFn } from '@storybook/react';

import CartBill from './CartBill';

export default {
  title: 'CartBill',
  component: CartBill,
};

const Template: StoryFn<React.ComponentProps<typeof CartBill>> = () => {
  return <CartBill />;
};

export const Controls = Template.bind({});
Controls.args = {};
