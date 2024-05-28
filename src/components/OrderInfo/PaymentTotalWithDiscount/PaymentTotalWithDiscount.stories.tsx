import type { Meta, StoryObj } from '@storybook/react';
import PaymentTotalWithDiscount from './PaymentTotalWithDiscount';
import { RECOIL_KEYS } from '../../../constants/constants';
import { RecoilRoot, atom } from 'recoil';

const meta = {
  title: 'PaymentTotalWithDiscount',
  component: PaymentTotalWithDiscount,
} satisfies Meta<typeof PaymentTotalWithDiscount>;

export default meta;

type Story = StoryObj<typeof meta>;

const priceInfoState = atom({
  key: RECOIL_KEYS.PRICE_INFO,
});

export const 기본: Story = {
  decorators: [
    Story => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(priceInfoState, {
            order: 3000,
            shipping: 3000,
            total: 6000,
          });
        }}
      >
        <Story />
      </RecoilRoot>
    ),
  ],
  args: {
    priceInfo: {
      order: 3000,
      shipping: 3000,
      total: 6000,
    },
    coupons: [],
  },
};

export const 배송비가_있을_때: Story = {
  decorators: [
    Story => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(priceInfoState, {
            order: 96999,
            shipping: 3000,
            total: 99999,
          });
        }}
      >
        <Story />
      </RecoilRoot>
    ),
  ],
  args: {
    priceInfo: {
      order: 96999,
      shipping: 3000,
      total: 99999,
    },
    coupons: [],
  },
};

export const 배송비가_없을_때: Story = {
  decorators: [
    Story => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(priceInfoState, {
            order: 100000,
            shipping: 0,
            total: 100000,
          });
        }}
      >
        <Story />
      </RecoilRoot>
    ),
  ],
  args: {
    priceInfo: {
      order: 100000,
      shipping: 0,
      total: 100000,
    },
    coupons: [],
  },
};
