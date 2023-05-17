import type { StoryFn } from '@storybook/react';
import CartItem from '../CartItem';

export default {
  title: 'CartItem',
  component: CartItem,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

const Template: StoryFn<React.ComponentProps<typeof CartItem>> = (props) => <CartItem {...props} />;

export const DefaultCartItem = Template.bind({});
DefaultCartItem.args = {
  id: 2,
  quantity: 5,
  product: {
    id: 96,
    name: 'SONY 컨트롤러',
    price: 104000,
    imageUrl: 'https://picsum.photos/id/96/300',
  },
};
