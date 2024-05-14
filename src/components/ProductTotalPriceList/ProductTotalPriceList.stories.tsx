import type { Meta, StoryObj } from '@storybook/react';
import ProductTotalPriceList from './ProductTotalPriceList';

const meta = {
  title: 'ProductTotalPriceList',
  component: ProductTotalPriceList,
} satisfies Meta<typeof ProductTotalPriceList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
