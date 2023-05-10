import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Counter from '.';

const counter = {
  component: Counter,
  title: 'Counter',
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
    const add: React.MouseEventHandler<HTMLButtonElement> = () =>
      setCount((prev) => prev + 1);
    const remove: React.MouseEventHandler<HTMLButtonElement> = () =>
      setCount((prev) => prev - 1);

    return <Counter add={add} remove={remove} count={count} />;
  },
};
