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
      order: 3000,
      shipping: 3000,
      total: 6000,
    },
  },
};

export const 배송비가_있을_때: Story = {
  args: {
    priceInfo: {
      order: 96999,
      shipping: 3000,
      total: 99999,
    },
  },
};

export const 배송비가_없을_때: Story = {
  args: {
    priceInfo: {
      order: 100000,
      shipping: 0,
      total: 100000,
    },
  },
};
