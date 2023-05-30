import { Meta, StoryObj } from '@storybook/react';
import { ProductItem } from '../components/ProductItem';
import { userEvent, within } from '@storybook/testing-library';
import { waitTimeout } from '../utils/waitTimeout';

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
    const { id, name, price, imageUrl } = {
      id: 1,
      name: 'PET보틀-정사각(420ml)',
      price: 43400,
      imageUrl: '/assets/1.png',
    };

    return (
      <ProductItem id={id} name={name} price={price} imageUrl={imageUrl} />
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const shoppingIcon = canvas.getByTestId('add-to-cart-button');

    if (!shoppingIcon) return;

    await waitTimeout(() => {
      userEvent.click(shoppingIcon);
    }, 500);

    const increaseButton = await canvas.findByTestId('increase-button');

    if (!increaseButton) return;

    await waitTimeout(() => {
      userEvent.click(increaseButton);
    }, 500);

    await waitTimeout(() => {
      userEvent.click(increaseButton);
    }, 500);

    await waitTimeout(() => {
      userEvent.click(increaseButton);
    }, 500);

    await waitTimeout(() => {
      userEvent.click(increaseButton);
    }, 500);

    const decreaseButton = await canvas.findByTestId('decrease-button');

    if (!decreaseButton) return;

    await waitTimeout(() => {
      userEvent.click(decreaseButton);
    }, 1000);

    await waitTimeout(() => {
      userEvent.click(decreaseButton);
    }, 500);

    await waitTimeout(() => {
      userEvent.click(decreaseButton);
    }, 500);

    await waitTimeout(() => {
      userEvent.click(decreaseButton);
    }, 500);

    await waitTimeout(() => {
      userEvent.click(decreaseButton);
    }, 500);
  },
};
