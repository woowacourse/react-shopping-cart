import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';
import OrderInfo from './OrderInfo';

const meta = {
  title: 'OrderInfo',
  component: OrderInfo,
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
      routing: { path: '/order-info' },
    }),
  },
} satisfies Meta<typeof OrderInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {};
