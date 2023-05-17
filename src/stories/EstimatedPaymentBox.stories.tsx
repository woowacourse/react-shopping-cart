import { Meta, StoryObj } from '@storybook/react';

import EstimatedPaymentBox from '../components/Cart/EstimatedPaymentBox';

const meta = {
  title: 'Cart/EstimatedPaymentBox',
  component: EstimatedPaymentBox,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EstimatedPaymentBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
