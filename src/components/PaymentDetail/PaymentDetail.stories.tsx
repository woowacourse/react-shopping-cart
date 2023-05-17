import { Meta, StoryObj } from '@storybook/react';
import PaymentDetail from '.';

const paymentDetail = {
  component: PaymentDetail,
  title: 'Cart/PaymentDetail',
  tags: ['autodocs'],
} satisfies Meta<typeof PaymentDetail>;

export default paymentDetail;

type Story = StoryObj<typeof paymentDetail>;

export const Default: Story = {
  args: {
    totalPrice: 1000,
  },
};

export const Empty: Story = {
  args: {
    totalPrice: 0,
  },
};
