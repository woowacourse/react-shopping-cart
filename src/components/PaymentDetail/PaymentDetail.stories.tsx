import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import PaymentDetail from '.';

const paymentDetail = {
  component: PaymentDetail,
  title: 'Cart/PaymentDetail',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
} satisfies Meta<typeof PaymentDetail>;

export default paymentDetail;

type Story = StoryObj<typeof paymentDetail>;

export const Default: Story = {};
