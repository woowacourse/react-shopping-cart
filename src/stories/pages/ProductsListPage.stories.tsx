import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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

export const Interaction: Story = {
  args: {},

  play: async ({ canvasElement, step }) => {
    window.localStorage.clear();

    const canvas = within(canvasElement);

    const productList = await canvas.findByRole('list');
    const productListCanvas = within(productList);
    const cartButtons = await productListCanvas.findAllByRole('button');

    const increaseButton = await productListCanvas.findAllByRole('button', {
      name: /subtract/i,
    });
    console.log(increaseButton);

    await step('Click Cart Button', async () => {
      await userEvent.click(cartButtons[0]);
      await userEvent.click(cartButtons[1]);
    });

    await waitFor(() => {
      expect(canvas.getByText(2)).toBeInTheDocument();
    });
  },
};
