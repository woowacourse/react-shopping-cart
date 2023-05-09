import type { Meta, StoryFn } from '@storybook/react';
import Counter from '../../components/Counter';

const meta = {
  title: 'ShoppingCart/common',
  component: Counter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryFn<typeof meta>;

export const Default: Story = () => {
  return <Counter initCount={1} />;
};
