import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { useState } from 'react';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    state: {
      description: '',
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    () => {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <div style={{ height: '24px', width: '24px' }}>
          <Checkbox
            state={isChecked}
            handleClick={() => setIsChecked(!isChecked)}
          />
        </div>
      );
    },
  ],
};
