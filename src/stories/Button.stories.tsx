import { Meta, StoryObj } from '@storybook/react';

import Button from '../components/Common/Button';

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Order: Story = {
  args: {
    designType: 'order',
    buttonLabel: '주문하기',
  },
};

export const Delete: Story = {
  args: {
    designType: 'delete',
    buttonLabel: '선택삭제',
  },
};
