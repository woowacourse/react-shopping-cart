import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Stepper } from '@commons/Stepper/Stepper';

/**
 * 스탭퍼
 */

const meta: Meta<typeof Stepper> = {
  title: 'Stepper',
  component: Stepper,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

const Wrapper = () => {
  const [quantity, setQuantity] = useState(1);

  return <Stepper step={quantity} setStep={setQuantity} />;
};

export const Default: Story = {
  render: () => <Wrapper />,
};
