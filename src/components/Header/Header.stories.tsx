import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';
import Header from './Header';

const meta = {
  title: 'Header',
  component: Header,
  decorators: [withRouter],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본: Story = {};

export const 뒤로가기모드: Story = {
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
};
