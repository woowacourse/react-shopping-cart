import type { Meta, StoryObj } from '@storybook/react';
import CartTitle from '.';

const meta: Meta<typeof CartTitle> = {
  title: 'CartTitle',
  component: CartTitle,
};

export default meta;
type Story = StoryObj<typeof CartTitle>;

export const Default: Story = {
  args: {},
};
