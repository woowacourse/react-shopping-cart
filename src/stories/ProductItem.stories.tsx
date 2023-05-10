import { Meta, StoryObj } from '@storybook/react';
import { ProductItem } from '../components/ProductItem';

const meta = {
  component: ProductItem,
  title: 'Components/ProductItem',
} satisfies Meta<typeof ProductItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 0,
    name: 'PET보틀-밀크티(370ml)',
    price: 3000,
    imageUrl: '../assets/2.png',
  },
};
