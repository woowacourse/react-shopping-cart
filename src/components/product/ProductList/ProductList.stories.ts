import type { Meta, StoryObj } from '@storybook/react';
import ProductList from './ProductList';
import { handlers } from '../../../mocks/handlers';

const meta = {
  title: 'product/ProductList',
  component: ProductList,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: handlers,
  },
};
