import { within } from '@testing-library/react';
import AddCartButton from '../components/AddCartButton';
import type { Meta, StoryObj } from '@storybook/react';
import userEvent from '@testing-library/user-event';

type Story = StoryObj<typeof AddCartButton>;
const meta: Meta<typeof AddCartButton> = {
  title: 'Common/AddCartButton',
  component: AddCartButton,
};
export default meta;

export const Default: Story = {
  args: {
    id: 1,
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
