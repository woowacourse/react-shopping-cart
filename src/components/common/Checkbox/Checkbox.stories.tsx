import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: '',
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const PlaygroundComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  return <Checkbox checked={isChecked} handleClick={() => setIsChecked(!isChecked)} />;
};

export const Playground: Story = {
  render: () => <PlaygroundComponent />,
};
