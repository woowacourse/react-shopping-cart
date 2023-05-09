import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Stepper from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Stepper',
  component: Stepper,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

const Wrapper = () => {
  const [count, setCount] = useState(1);

  return <Stepper count={count} setCount={setCount} />;
};

export const Default: Story = {
  render: () => <Wrapper />,
};
