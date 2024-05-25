import { OrderShippingInformation } from './OrderShippingInformation';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof OrderShippingInformation> = {
  title: '2. pages/order/OrderShippingInformation',
  component: OrderShippingInformation,
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

type Story = StoryObj<typeof OrderShippingInformation>;

export const Common: Story = {};
