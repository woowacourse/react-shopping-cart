import type { Meta, StoryObj } from '@storybook/react';
import ProductTotalPriceList from './ProductTotalPriceList';
import { RecoilRoot } from 'recoil';

const meta = {
  title: 'ProductTotalPriceList',
  component: ProductTotalPriceList,
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      );
    },
  ],
} satisfies Meta<typeof ProductTotalPriceList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    priceList: {
      0: ['주문 금액', 100000],
      1: ['쿠폰 할인 금액', 20000],
      2: ['배송비', 0],
    },
    totalPrice: 80000,
  },
};
