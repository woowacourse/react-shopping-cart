import { OrderItemCardCounter } from './OrderItemCardCounter';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof OrderItemCardCounter> = {
  title: '2. pages/order/OrderItemCardCounter',
  component: OrderItemCardCounter,
  decorators: [
    (Story) => (
      <div style={{ padding: '3px', border: '1px dashed black' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    quantity: 1,
  },
};

export default meta;

type Story = StoryObj<typeof OrderItemCardCounter>;

export const Common: Story = {};
