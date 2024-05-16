import type { Meta, StoryObj } from '@storybook/react';
import ProductItem from './ProductItem';
import { RecoilRoot } from 'recoil';

const meta = {
  title: 'ProductItem',
  component: ProductItem,
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      );
    },
  ],
} satisfies Meta<typeof ProductItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cartItem: {
      id: 1,
      quantity: 1,
      product: {
        id: 1,
        category: 'fashion',
        name: 'Product Name',
        price: 10000,
        imageUrl: 'https://via.placeholder.com/150',
      },
    },
  },
};
