import ProductItemList from '../components/ProductItemList';
import handlers from '../mocks/handlers';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof ProductItemList>;
const meta: Meta<typeof ProductItemList> = {
  title: 'Product/ProductItemList',
  component: ProductItemList,
};
export default meta;

const product = {
  id: 1,
  name: 'PET보틀-정사각(420ml)',
  price: 10000,
  imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
};

export const Default: Story = {
  args: {
    products: Array.from({ length: 12 }, () => product, []),
  },
  parameters: {
    msw: handlers,
  },
};
