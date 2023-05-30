import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import ProductList from '../components/Product/ProductList/ProductList';

const meta = {
  title: 'ShoppingCart/ProductList',
  component: ProductList,
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    window.localStorage.clear();

    await new Promise((resolve) => setTimeout(resolve, 2000));
    const buyButton = canvas.queryAllByRole('button')[0];
    await userEvent.click(buyButton);

    await new Promise((resolve) => setTimeout(resolve, 700));
    const addButton = document.querySelector('button[aria-label="add item"]')!;
    await userEvent.click(addButton);
    await new Promise((resolve) => setTimeout(resolve, 700));
    await userEvent.click(buyButton);

    const increaseButton = document.querySelector('button[aria-label="increase"]')!;
    await userEvent.click(increaseButton);

    await new Promise((resolve) => setTimeout(resolve, 700));

    const quantityInput = document.querySelector('input[name="count"]')!;
    expect(quantityInput).toHaveValue('2');

    await new Promise((resolve) => setTimeout(resolve, 300));

    await userEvent.type(quantityInput, '3', { delay: 300 });
    expect(quantityInput).toHaveValue('23');

    await new Promise((resolve) => setTimeout(resolve, 700));

    const addButton2 = document.querySelector('button[aria-label="add item"]')!;
    await userEvent.click(addButton2);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const buyButton2 = canvas.queryAllByRole('button')[0];
    expect(buyButton2).toHaveTextContent('23');
  },
};
