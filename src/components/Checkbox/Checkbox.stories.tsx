import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta = {
  title: 'Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본_체크박스: Story = {
  args: {
    id: 1,
    isChecked: false,
  },
};

export const 선택된_체크박스: Story = {
  args: {
    id: 1,
    isChecked: true,
  },
};
