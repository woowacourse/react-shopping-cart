import { Meta, StoryObj } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';
import CartProductsListPage from '../../pages/CartProductsListPage';

const meta = {
  title: 'Pages/CartProductsListPage',
  component: CartProductsListPage,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof CartProductsListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
