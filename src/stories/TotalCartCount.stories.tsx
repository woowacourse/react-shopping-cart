import { Meta, StoryObj } from '@storybook/react';
import { TotalCartCount } from '../components/TotalCartCount';

const meta = {
  component: TotalCartCount,
  title: 'Components/TotalCartCount',
} satisfies Meta<typeof TotalCartCount>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 1,
  },
};
