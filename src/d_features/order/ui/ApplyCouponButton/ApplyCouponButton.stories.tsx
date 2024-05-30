import { ApplyCouponButton } from './ApplyCouponButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ApplyCouponButton> = {
  title: '4. features/order/ApplyCouponButton',
  component: ApplyCouponButton,
  decorators: [
    (Story) => (
      <div style={{ width: '40vw' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ApplyCouponButton>;

export const Common: Story = {};
