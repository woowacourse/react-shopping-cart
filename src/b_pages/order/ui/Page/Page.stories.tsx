import { OrderPage } from './Page';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof OrderPage> = {
  title: '2. pages/order/OrderPage',
  component: OrderPage,
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof OrderPage>;

export const Common: Story = {};
