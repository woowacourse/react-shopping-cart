import type { Meta, StoryObj } from '@storybook/react';
import ChangeQuantity from './ChangeQuantity';
import { useState } from 'react';

const meta: Meta<typeof ChangeQuantity> = {
  title: 'Components/ChangeQuantity',
  component: ChangeQuantity,
  tags: ['autodocs'],
  argTypes: {
    quantity: {
      description: 'The current quantity',
      control: { type: 'number' },
    },
    decreaseQuantity: {
      description: 'Function to decrease the quantity',
    },
    increaseQuantity: {
      description: 'Function to increase the quantity',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const PlaygroundComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <ChangeQuantity
      quantity={value}
      decreaseQuantity={() => setValue((prev) => Math.max(prev - 1, 0))}
      increaseQuantity={() => setValue((prev) => prev + 1)}
    />
  );
};

export const Playground: Story = {
  render: () => <PlaygroundComponent />,
};
