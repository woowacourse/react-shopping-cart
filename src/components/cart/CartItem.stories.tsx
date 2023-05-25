import type { StoryFn } from '@storybook/react';

import CartItem from './CartItem';

export default {
  title: 'CartItem',
  component: CartItem,
};

const Template: StoryFn<React.ComponentProps<typeof CartItem>> = (props) => {
  return <CartItem {...props} />;
};
export const Controls = Template.bind({});
Controls.args = {
  id: 1,
  quantity: 1,
  product: {
    id: 96,
    name: 'SONY 컨트롤러',
    price: 104000,
    imageUrl: 'https://picsum.photos/id/96/300',
  },
  checked: true,
};
