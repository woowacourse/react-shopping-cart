import { Meta, StoryObj } from '@storybook/react';

import ProductsListPage from '../../pages/ProductsListPage';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Pages/ProductsListPage',
  component: ProductsListPage,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof ProductsListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
