import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Counter from './Counter';
import type { CounterSize } from './Counter';

interface CounterWithStateProps {
  size: CounterSize;
}

const CounterWithState = ({ size }: CounterWithStateProps) => {
  const [count, setCount] = useState(1);
  return (
    <Counter count={count} onChange={setCount} size={size} onBlur={() => {}} />
  );
};

const meta = {
  title: 'common/Counter',
  component: CounterWithState,
  tags: ['autodocs'],
} satisfies Meta<typeof CounterWithState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};
