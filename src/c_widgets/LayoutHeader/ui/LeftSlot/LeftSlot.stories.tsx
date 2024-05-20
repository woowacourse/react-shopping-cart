import { LeftSlot } from './LeftSlot';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LeftSlot> = {
  title: 'widgets/LayoutHeader/LeftSlot',
  component: LeftSlot,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof LeftSlot>;

export const NoneType: Story = {
  args: {
    type: 'none',
  },
};

export const GoBackType: Story = {
  args: {
    type: 'goBack',
  },
};
