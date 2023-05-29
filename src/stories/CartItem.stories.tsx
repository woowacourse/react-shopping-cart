import { Meta, StoryObj } from '@storybook/react';
import { CartItem } from '../components/CartItem';

const meta = {
  component: CartItem,
  title: 'Components/CartItem',
} satisfies Meta<typeof CartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 1,
    imageUrl: '/assets/2.png',
    name: 'PET보틀-밀크티(370ml)',
    price: 73400,
    quantity: 2,
  },
};
