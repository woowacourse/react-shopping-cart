import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import CartListSection from './CartListSection';

const meta = {
  title: 'CartList/CartListSection',
  component: CartListSection,
  tags: ['autodocs'],
} satisfies Meta<typeof CartListSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CartListContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByLabelText('allCheck'));
    await userEvent.click(canvas.getByLabelText('allCheck'));
    await userEvent.click(canvas.getByLabelText('allCheck'));

    const allItemPrice = canvas.getAllByLabelText('price');

    const allItemTotalPrice = allItemPrice.reduce((acc, cur) => {
      const priceString = cur.innerText;
      const price = parseInt(priceString.replace(/원/g, '').replace(/,/g, ''), 10);

      return acc + price;
    }, 0);

    const totalPrice = parseInt(
      canvas.getByLabelText('totalPrice').innerText.replace(/원/g, '').replace(/,/g, ''),
      10,
    );

    await expect(allItemTotalPrice).toEqual(totalPrice);
  },
};
