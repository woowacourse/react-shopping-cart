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
  args: {},
};
