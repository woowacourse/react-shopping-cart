import type { Meta, StoryObj } from '@storybook/react';
import PaymentTotal from './PaymentTotal';
import { RECOIL_KEYS } from '../../constants/constants';
import { RecoilRoot, atom } from 'recoil';

const meta = {
  title: 'PaymentTotal',
  component: PaymentTotal,
} satisfies Meta<typeof PaymentTotal>;

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
};
