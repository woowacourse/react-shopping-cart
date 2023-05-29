import { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import ProductsListPage from '../../pages/ProductsListPage';

const meta = {
  title: 'Pages/ProductsListPage',
  component: ProductsListPage,
  tags: ['autodocs'],
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
} satisfies Meta<typeof ProductsListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Interaction: Story = {
  args: {},

  play: async ({ canvasElement, step }) => {
    window.localStorage.clear();

    const canvas = within(canvasElement);

    const productList = await canvas.findByRole('list');
    const productListCanvas = within(productList);
    const cartButtons = await productListCanvas.findAllByRole('button');

    await step('Click Cart Button', async () => {
      await userEvent.click(cartButtons[0]);
      await userEvent.click(cartButtons[1]);
    });

    await waitFor(() => {
      expect(canvas.getByText(2)).toBeInTheDocument();
    });
  },
};
