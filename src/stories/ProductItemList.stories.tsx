import ProductItemList from '../components/ProductItemList';
import handlers from '../mocks/handlers';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof ProductItemList>;
const meta: Meta<typeof ProductItemList> = {
  title: 'Product/ProductItemList',
  component: ProductItemList,
};
export default meta;

export const Default: Story = {
  args: {
    products,
  },
};
