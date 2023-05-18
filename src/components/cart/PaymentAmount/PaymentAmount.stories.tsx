import type { Meta, StoryObj } from '@storybook/react';
import PaymentAmount from './PaymentAmount';

const meta = {
  title: 'PaymentAmount',
  component: PaymentAmount,
  tags: ['autodocs'],
} satisfies Meta<typeof PaymentAmount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { checkedList: [] },
};
