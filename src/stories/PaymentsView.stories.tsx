import PaymentsView from '../components/PaymentsView';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof PaymentsView>;
const meta: Meta<typeof PaymentsView> = {
  title: 'Common/PaymentsView',
  component: PaymentsView,
};
export default meta;

export const Default: Story = {
  args: {
    priceTotal: 500000,
    parcelPrice: 3000,
  },
};
