import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddCartButton from '../components/AddCartButton';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof AddCartButton>;
const meta: Meta<typeof AddCartButton> = {
  title: 'Common/AddCartButton',
  component: AddCartButton,
};
export default meta;

export const Default: Story = {
  args: {
    productId: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const CartButton = canvas.getByRole('button');
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    userEvent.click(CartButton);
  },
};
