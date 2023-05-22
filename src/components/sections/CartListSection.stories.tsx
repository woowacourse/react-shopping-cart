import { userEvent, within } from '@storybook/testing-library';
import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import CartListSection from './CartListSection';

const meta = {
  title: 'CartList/CartListSection',
  component: CartListSection,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      localStorage.setItem('cartList', JSON.stringify(mockData));
      return <Story />;
    },
  ],
} satisfies Meta<typeof CartListSection>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockData = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 1,
      name: '지구',
      price: 1000,
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009__480.jpg',
    },
  },
  {
    id: 2,
    quantity: 2,
    product: {
      id: 2,
      name: '화성',
      price: 200000,
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
    },
  },
];

export const CheckIsSameTotalPrice: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByLabelText('allCheck'));
    await userEvent.click(canvas.getByLabelText('allCheck'));
    await userEvent.click(canvas.getByLabelText('allCheck'));

    const allItemPriceElements = canvas.getAllByLabelText('price');
    const eachQuantityElements = canvas.getAllByLabelText('quantity');

    const allItemTotalPrice = allItemPriceElements.reduce((acc, cur, index) => {
      const priceString = cur.innerText;
      const price = Number(priceString.replace(/원/g, '').replace(/,/g, ''));
      const quantity = Number(eachQuantityElements[index].getAttribute('value'));

      return acc + price * quantity;
    }, 0);

    const totalPrice = parseInt(
      canvas.getByLabelText('totalPrice').innerText.replace(/원/g, '').replace(/,/g, ''),
      10,
    );

    await expect(allItemTotalPrice).toEqual(totalPrice);
  },
};
