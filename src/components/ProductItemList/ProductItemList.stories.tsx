import { Meta, StoryObj } from '@storybook/react';
import ProductItemList from '.';

const productItemList = {
  component: ProductItemList,
  title: 'Cart/ProductItemList',
  tags: ['autodocs'],
} satisfies Meta<typeof ProductItemList>;

export default productItemList;

type Story = StoryObj<typeof productItemList>;

export const Default: Story = {};
