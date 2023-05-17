import type { Meta, StoryObj } from '@storybook/react';
import ProductList from '../components/product/ProductList';
import { handlers } from '../mocks/handlers';

const meta = {
  title: 'ShoppingCart/ProductList',
  component: ProductList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: handlers,
  },
};
