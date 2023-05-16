import ProductItem from '../components/ProductItem';
import type { Meta, StoryObj } from '@storybook/react';
import { handlers } from '../mocks/handlers';

type Story = StoryObj<typeof ProductItem>;
const meta: Meta<typeof ProductItem> = {
  title: 'ProductItem',
  component: ProductItem,
};
export default meta;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      name: 'PET보틀-정사각(420ml)',
      price: 10000,
      imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
    },
  },
  parameters: {
    msw: handlers,
  },
};
