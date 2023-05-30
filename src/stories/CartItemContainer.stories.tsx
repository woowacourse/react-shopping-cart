import { Meta, StoryObj } from '@storybook/react';
import { CartItemContainer } from '../components/CartItemContainer';

const meta = {
  component: CartItemContainer,
  title: 'Components/CartItemContainer',
} satisfies Meta<typeof CartItemContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
