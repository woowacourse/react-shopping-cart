import { PayOrderButton } from './PayOrderButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PayOrderButton> = {
  title: '4. features/cart/PayOrderButton',
  component: PayOrderButton,
};

export default meta;

type Story = StoryObj<typeof PayOrderButton>;

export const Common: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '90vw' }}>
        <Story />
      </div>
    ),
  ],
};
