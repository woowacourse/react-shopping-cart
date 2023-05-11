import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import ProductItem from './ProductItem';

const meta = {
  title: 'Example/ProductItem',
  component: ProductItem,
  tags: ['autodocs'],
  args: {
    id: 9,
    name: '밀크티',
    price: 9000,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/2806/9936/products/zws-essentials-sponge-cloth-set-of-4-zero-waste-sponge-cloth-swedish-dish-cloth-paper-towel-replacement-kitchen-sponge-31138620276847.jpg?v=1655836694&width=900',
  },
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
} satisfies Meta<typeof ProductItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {};
