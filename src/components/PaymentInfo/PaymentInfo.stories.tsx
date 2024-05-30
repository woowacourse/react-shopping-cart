import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';
import PaymentInfo from './PaymentInfo';

const meta = {
  title: 'PaymentInfo',
  component: PaymentInfo,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        state: {
          kindCount: 2,
          productCount: 4,
          totalPrice: 15000,
        },
      },
      routing: { path: '/payment-info' },
    }),
  },
} satisfies Meta<typeof PaymentInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {};
