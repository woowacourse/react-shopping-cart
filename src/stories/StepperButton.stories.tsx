import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { useState } from 'react';

import StepperButton from '../components/StepperButton/StepperButton';

const meta = {
  title: 'ShoppingCart/StepperButton',
  component: StepperButton,
  argTypes: {
    count: {
      table: { disable: true },
    },
    minCount: {
      control: { type: 'number' },
    },
    maxCount: {
      control: { type: 'number' },
    },
    setCount: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof StepperButton>;

export default meta;
type Story = StoryObj<typeof StepperButton>;

export const Default: Story = {
  render: ({ ...args }) => {
    const [count, setCount] = useState(0);

    return (
      <StepperButton
        count={count}
        setCount={setCount}
        minCount={args.minCount}
        maxCount={args.maxCount}
      />
    );
  },
  args: {
    minCount: 0,
    maxCount: 100,
  },
};

export const Interaction: Story = {
  args: {
    minCount: 0,
    maxCount: 100,
  },
  render: ({ ...args }) => {
    const [count, setCount] = useState(0);

    return (
      <StepperButton
        count={count}
        setCount={setCount}
        minCount={args.minCount}
        maxCount={args.maxCount}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const decreaseButton = canvas.getByRole('button', { name: 'decrease' });
    const increaseButton = canvas.getByRole('button', { name: 'increase' });
    const countInput = canvas.getByLabelText('count input');

    await userEvent.click(increaseButton);
    await userEvent.click(increaseButton);
    await userEvent.click(increaseButton);
    expect(countInput).toHaveValue('3');

    await userEvent.type(countInput, '4', { delay: 200 });
    expect(countInput).toHaveValue('34');

    await userEvent.click(decreaseButton);
    expect(countInput).toHaveValue('33');
  },
};
