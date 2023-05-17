import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

/**
 * `Button`은 외부에서 받은 행동을 하는 컴포넌트입니다.
 */
const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultButton: Story = {
  args: {
    text: 'button',
    width: '320px',
  },
};
