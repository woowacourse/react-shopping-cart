import type { Meta, StoryObj } from '@storybook/react';
import AddCartButton from './AddCartButton';

const meta: Meta<typeof AddCartButton> = {
  title: 'AddCartButton',
  component: AddCartButton,
};

export default meta;
type Story = StoryObj<typeof AddCartButton>;

export const Default: Story = {
  args: {},
};
