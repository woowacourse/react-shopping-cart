import type { Meta, StoryObj } from '@storybook/react';
import { theme } from '@styles/theme';
import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: '선택삭제',
  },
};

export const Order: Story = {
  args: {
    text: '주문하기',
    width: '388px',
    height: '73px',
    fontSize: '24px',
    backgroundColor: theme.colors.primaryBlack,
    color: theme.colors.white,
  },
};
