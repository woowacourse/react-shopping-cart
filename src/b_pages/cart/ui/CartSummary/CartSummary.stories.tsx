import { CartSummary } from './CartSummary';

import type { Meta, StoryObj } from '@storybook/react';

// TODO: Connect to state
const meta: Meta<typeof CartSummary> = {
  title: '2. pages/cart/CartSummary',
  component: CartSummary,
  decorators: [
    (Story) => {
      return (
        <div style={{ width: '60vw', border: '1px dashed black', padding: '20px' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof CartSummary>;

export const Common: Story = {};
