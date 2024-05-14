import type { Meta, StoryObj } from '@storybook/react';
import OrderInfo from './OrderInfo';

const meta = {
  title: 'OrderInfo',
  component: OrderInfo,
} satisfies Meta<typeof OrderInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {};
