import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import ProductList from '../../components/product/ProductList/ProductList';
import ProductListSkeleton from '../../components/product/ProductList/ProductListSkeleton';
import { delay } from '../../utils/delay';

const meta = {
  title: 'ShoppingCart/Product/ProductList',
  component: ProductList,
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <ProductListSkeleton />,
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    window.localStorage.clear();

    await delay(3000);

    const buyButton = canvas.queryAllByRole('button')[0];
    await userEvent.click(buyButton);

    await delay(700);

    const increaseButton = document.querySelector('button[aria-label="카운트 증가"]')!;
    console.log(increaseButton);
    await userEvent.click(increaseButton);

    await delay(700);

    const quantityInput = document.querySelector('input[name="count"]')!;
    expect(quantityInput).toHaveValue('2');

    await delay(300);

    await userEvent.type(quantityInput, '3', { delay: 300 });
    expect(quantityInput).toHaveValue('23');

    await delay(700);

    const addButton = document.querySelector('button#add-cart')!;
    await userEvent.click(addButton);

    await delay(700);

    const newBuyButton = canvas.queryAllByRole('button')[0];
    expect(newBuyButton).toHaveTextContent('23');
  },
};
