import type { Meta, StoryObj } from '@storybook/react';
import ChangeQuantity from './ChangeQuantity';
import { useState } from 'react';

const meta = {
  title: 'Components/ChangeQuantity',
  component: ChangeQuantity,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '',
      control: { type: 'number' },
    },
    decreaseValue: {
      description: '',
      // control: { type: 'number' }
    },
    increaseValue: {
      description: '',
      // control: { type: 'number' }
    },
  },
} satisfies Meta<typeof ChangeQuantity>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    () => {
      const [value, setValue] = useState(0);
      return (
        <ChangeQuantity
          value={value}
          decreaseValue={() => setValue((prev) => Math.max(prev - 1, 0))}
          increaseValue={() => setValue((prev) => prev + 1)}
        />
      );
    },
  ],
};
