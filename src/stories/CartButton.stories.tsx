import { Meta, StoryObj } from '@storybook/react';
import { CartButton } from '../components/CartButton';

const meta = {
  component: CartButton,
  title: 'Components/CartButton',
} satisfies Meta<typeof CartButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleAddCartState: () => {
      return;
    },
    handleDeleteCartState: () => {
      return;
    },
    id: 0,
  },
};
