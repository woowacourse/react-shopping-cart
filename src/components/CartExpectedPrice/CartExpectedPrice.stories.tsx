import type { Meta, StoryObj } from '@storybook/react';
import CartExpectedPrice from '.';

const meta: Meta<typeof CartExpectedPrice> = {
  title: 'CartExpectedPrice',
  component: CartExpectedPrice,
};

export default meta;
type Story = StoryObj<typeof CartExpectedPrice>;

export const Default: Story = {
  args: { name: '나는야 패트릭 볶음밥' },
};
