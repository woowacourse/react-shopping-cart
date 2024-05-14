import type { Meta, StoryObj } from '@storybook/react';
import PaymentTotal from './PaymentTotal';

const meta = {
  title: 'PaymentTotal',
  component: PaymentTotal,
} satisfies Meta<typeof PaymentTotal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {
  args: {
    priceInfo: {
      order: 70000,
      shipping: 3000,
      total: 73000,
    },
  },
};
