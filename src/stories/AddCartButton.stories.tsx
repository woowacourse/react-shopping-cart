import AddCartButton from '../components/AddCartButton';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof AddCartButton>;
const meta: Meta<typeof AddCartButton> = {
  title: 'AddCartButton',
  component: AddCartButton,
};
export default meta;

export const Default: Story = {
  args: {
    id: 1,
  },
};
