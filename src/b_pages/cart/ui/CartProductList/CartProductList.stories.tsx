import { mockCarts } from '../../../../../mocks';

import { CartItemList } from './CartProductList';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CartItemList> = {
  title: '2. pages/cart/CartProductList',
  component: CartItemList,
  decorators: [
    (Story) => (
      <div style={{ width: '90vw', padding: '10px', border: '1px dashed black' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    cartItems: mockCarts.slice(0, 5),
  },
};

export default meta;

type Story = StoryObj<typeof CartItemList>;

export const Common: Story = {};
