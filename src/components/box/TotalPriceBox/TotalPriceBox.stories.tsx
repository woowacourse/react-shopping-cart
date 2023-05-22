import type { Meta, StoryObj } from '@storybook/react';
import TotalPriceBox from './TotalPriceBox';

const meta = {
  title: 'box/TotalPriceBox',
  component: TotalPriceBox,
  tags: ['autodocs'],
} satisfies Meta<typeof TotalPriceBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TotalPriceBoxStories: Story = {
  args: { totalProductPrice: 21700, shippingFee: 3000 },
};
