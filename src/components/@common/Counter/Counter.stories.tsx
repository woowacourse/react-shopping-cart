import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Counter from '.';

const counter = {
  component: Counter,
  title: 'Common/Counter',
  tags: ['autodocs'],
  args: {
    count: 0,
  },
} satisfies Meta<typeof Counter>;

export default counter;

type Story = StoryObj<typeof counter>;

export const Default: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    const increment: React.MouseEventHandler<HTMLButtonElement> = () =>
      setCount((prev) => prev + 1);
    const decrement: React.MouseEventHandler<HTMLButtonElement> = () =>
      setCount((prev) => prev - 1);

    return (
      <Counter increment={increment} decrement={decrement} count={count} />
    );
  },
};
