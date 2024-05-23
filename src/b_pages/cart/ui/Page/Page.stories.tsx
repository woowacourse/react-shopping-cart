import { CartPage } from './Page';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CartPage> = {
  title: '2. pages/cart/CartPage',
  component: CartPage,
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CartPage>;

export const Common: Story = {};
