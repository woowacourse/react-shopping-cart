import { Meta, StoryObj } from '@storybook/react';
import { AddToCartButton } from '../components/AddToCartButton';

const meta = {
  component: AddToCartButton,
  title: 'Components/AddToCartButton',
} satisfies Meta<typeof AddToCartButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    addToCartState: () => {
      return;
    },
    product: {
      id: 2,
      name: 'PET보틀-밀크티(370ml)',
      price: 73400,
      imageUrl: '/assets/2.png',
    },
    id: 0,
  },
};
