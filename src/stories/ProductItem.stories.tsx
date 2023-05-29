import { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import ProductItem from '../components/Product/ProductItem';

const meta = {
  title: 'Product/ProductItem',
  component: ProductItem,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct = {
  id: 1,
  name: 'PET보틀-정사각(420ml)',
  price: 43400,
  imageUrl: 'images/정사각-420.jpeg',
};

export const Default: Story = {
  args: {
    product: mockProduct,
  },
};

export const ClickCartButton: Story = {
  args: {
    product: mockProduct,
  },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    window.localStorage.clear();

    const firstCartButton = await canvas.findByRole('button');

    await step('Click Cart Button', async () => {
      await userEvent.click(firstCartButton);
    });

    await waitFor(() => {
      expect(canvas.getByDisplayValue(1)).toBeInTheDocument();
    });
  },
};
