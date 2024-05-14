import type { Meta, StoryObj } from '@storybook/react';
import FloatingButton from './FloatingButton';

const meta = {
  title: 'FloatingButton',
  component: FloatingButton,
} satisfies Meta<typeof FloatingButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {
  args: {
    label: '주문 확인',
  },
};
