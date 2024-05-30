import { FooterButton } from './FooterButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FooterButton> = {
  title: '6. shared/FooterButton',
  component: FooterButton,
  decorators: [
    (Story) => (
      <div style={{ width: '90vw' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FooterButton>;

export const Common: Story = {
  args: {
    children: 'FooterButton',
  },
};
