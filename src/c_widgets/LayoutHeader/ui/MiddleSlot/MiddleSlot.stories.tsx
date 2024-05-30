import { MiddleSlot } from './MiddleSlot';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MiddleSlot> = {
  title: '3. widgets/LayoutHeader/MiddleSlot',
  component: MiddleSlot,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MiddleSlot>;

export const NoneType: Story = {
  args: {
    type: 'none',
  },
};

export const LogoType: Story = {
  args: {
    type: 'logo',
  },
};
