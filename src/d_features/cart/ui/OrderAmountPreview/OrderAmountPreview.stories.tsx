import { OrderAmountPreview } from './OrderAmountPreview';

import type { Meta, StoryObj } from '@storybook/react';

// TODO: Connect to state
const meta: Meta<typeof OrderAmountPreview> = {
  title: 'features/cart/OrderAmountPreview',
  component: OrderAmountPreview,
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

type Story = StoryObj<typeof OrderAmountPreview>;

export const Common: Story = {};
