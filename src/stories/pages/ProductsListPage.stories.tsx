import { Meta, StoryObj } from '@storybook/react';

import ProductsListPage from '../../pages/ProductsListPage';

const meta = {
  title: 'Pages/ProductsListPage',
  component: ProductsListPage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ProductsListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
