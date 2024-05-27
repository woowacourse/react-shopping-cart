import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import OrderConfirmCart from './OrderConfirmCart';
import { BrowserRouter as Router } from 'react-router-dom';

const meta = {
  title: 'OrderConfirmCart',
  component: OrderConfirmCart,
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <Router>
            <Story />
          </Router>
        </RecoilRoot>
      );
    },
  ],
} satisfies Meta<typeof OrderConfirmCart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cartItems: [
      {
        id: 2605,
        product: {
          category: 'fashion',
          id: 11,
          imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
          name: '리복',
          price: 20000,
        },
        quantity: 5,
      },
    ],
  },
};
