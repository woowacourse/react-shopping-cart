import type { Meta, StoryObj } from '@storybook/react';
import ProductCardList from './ProductCardList';

const meta: Meta<typeof ProductCardList> = {
  title: 'ProductCardList',
  component: ProductCardList,
};

export default meta;

type Story = StoryObj<typeof ProductCardList>;

export const Default: Story = {
  args: {},
};
