import type { Meta, StoryObj } from '@storybook/react';
import EstimatedPayment from '.';

const meta: Meta<typeof EstimatedPayment> = {
  title: 'EstimatedPayment',
  component: EstimatedPayment,
};

export default meta;
type Story = StoryObj<typeof EstimatedPayment>;

export const Default: Story = {
  args: {},
};
