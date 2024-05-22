import type { Meta, StoryObj } from '@storybook/react';
import ChangeQuantity from './ChangeQuantity';
import { useState } from 'react';

const meta = {
  title: 'Components/ChangeQuantity',
  component: ChangeQuantity,
  tags: ['autodocs'],
  argTypes: {
    quantity: {
      description: '',
      control: { type: 'number' },
    },
  },
} satisfies Meta<typeof ChangeQuantity>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    () => {
      const [value, setValue] = useState(3);
      return (
        <ChangeQuantity
          quantity={value}
          decreaseQuantity={() => setValue((prev) => Math.max(prev - 1, 0))}
          increaseQuantity={() => setValue((prev) => prev + 1)}
        />
      );
    },
  ],
};
