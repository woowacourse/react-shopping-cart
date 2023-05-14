import { Meta, StoryObj } from '@storybook/react';
import { ProductItem } from '../components/ProductItem';
import { getMockData } from '../utils/getMockData';
import { userEvent, within } from '@storybook/testing-library';

const meta = {
  component: ProductItem,
  title: 'Components/ProductItem',
} satisfies Meta<typeof ProductItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 0,
    name: 'PET보틀-밀크티(370ml)',
    price: 73400,
    imageUrl: '/assets/2.png',
  },
};

export const InteractionTest: StoryObj<typeof ProductItem> = {
  render: () => {
    const { id, name, price, imageUrl } = getMockData[1];

    return (
      <ProductItem id={id} name={name} price={price} imageUrl={imageUrl} />
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const shoppingIcon = canvas.getByTestId('add-to-cart-button');

    if (!shoppingIcon) return;

    setTimeout(() => {
      userEvent.click(shoppingIcon);
    }, 1000);

    const increaseButton = await canvas.findByTestId('increase-button');

    if (!increaseButton) return;

    setTimeout(() => {
      userEvent.click(increaseButton);
    }, 500);
    setTimeout(() => {
      userEvent.click(increaseButton);
    }, 1000);
    setTimeout(() => {
      userEvent.click(increaseButton);
    }, 1500);
    setTimeout(() => {
      userEvent.click(increaseButton);
    }, 2000);

    const decreaseButton = await canvas.findByTestId('decrease-button');

    if (!decreaseButton) return;

    setTimeout(() => {
      userEvent.click(decreaseButton);
    }, 2500);
    setTimeout(() => {
      userEvent.click(decreaseButton);
    }, 3000);
    setTimeout(() => {
      userEvent.click(decreaseButton);
    }, 3500);
    setTimeout(() => {
      userEvent.click(decreaseButton);
    }, 4000);
    setTimeout(() => {
      userEvent.click(decreaseButton);
    }, 4500);
  },
};
