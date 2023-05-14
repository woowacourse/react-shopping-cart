import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Stepper from '@components/commons/Stepper/Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Stepper',
  component: Stepper,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

const Wrapper = () => {
  const [productCount, setProductCount] = useState(1);

  return (
    <Stepper productCount={productCount} setProductCount={setProductCount} />
  );
};

export const Default: Story = {
  render: () => <Wrapper />,
};
