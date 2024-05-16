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

export const logoType: Story = {
  args: {
    type: 'logo',
  },
};

export const goBackType: Story = {
  args: {
    type: 'goBack',
  },
};
