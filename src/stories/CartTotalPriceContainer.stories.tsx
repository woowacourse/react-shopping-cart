import { Meta, StoryObj } from '@storybook/react';
import { CartTotalPriceContainer } from '../components/CartTotalPriceContainer';

const meta = {
  component: CartTotalPriceContainer,
  title: 'Components/CartTotalPriceContainer',
} satisfies Meta<typeof CartTotalPriceContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
