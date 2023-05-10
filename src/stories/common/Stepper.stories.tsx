import type { Meta, StoryFn } from '@storybook/react';
import Stepper from '../../components/Stepper';

const meta = {
  title: 'ShoppingCart/common/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryFn<typeof meta>;

export const Default: Story = () => {
  return <Stepper initCount={1} />;
};
