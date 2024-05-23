import { mockCarts } from '../../../../../mocks';

import { CartProductList } from './CartProductList';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CartProductList> = {
  title: '2. pages/cart/CartProductList',
  component: CartProductList,
  decorators: [
    (Story) => (
      <div style={{ width: '90vw', padding: '10px', border: '1px dashed black' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    carts: mockCarts.slice(0, 5),
  },
};

export default meta;

type Story = StoryObj<typeof CartProductList>;

export const Common: Story = {};
