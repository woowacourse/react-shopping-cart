import { Meta, StoryObj } from '@storybook/react';

import ExpectedPaymentBox from '../components/Cart/ExpectedPaymentBox';

const meta = {
  title: 'Cart/ExpectedPaymentBox',
  component: ExpectedPaymentBox,
  tags: ['autodocs'],
} satisfies Meta<typeof ExpectedPaymentBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
