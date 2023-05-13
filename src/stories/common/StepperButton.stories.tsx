import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import StepperButton from '../../components/common/StepperButton/StepperButton';
import { useCount } from '../../hooks/useCount';
import { delay } from '../../utils/delay';

const meta = {
  title: 'ShoppingCart/common/StepperButton',
  component: StepperButton,
  argTypes: {
    count: {
      control: false,
    },
    minCount: {
      control: { type: 'number' },
    },
    maxCount: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
  },
  args: {
    minCount: 0,
    maxCount: 100,
    step: 1,
  },
} satisfies Meta<typeof StepperButton>;

export default meta;
type Story = StoryObj<typeof StepperButton>;

const createStepperButtonStory = () => ({
  render: ({ ...args }) => {
    const { count, handleDecreaseCount, handleIncreaseCount, handleCountChange } = useCount(
      args.minCount
    );

    return (
      <StepperButton
        count={count}
        minCount={args.minCount}
        maxCount={args.maxCount}
        step={args.step}
        handleDecreaseCount={handleDecreaseCount}
        handleIncreaseCount={handleIncreaseCount}
        handleCountChange={handleCountChange}
      />
    );
  },
});

export const Default: Story = createStepperButtonStory();

export const Interaction: Story = {
  ...createStepperButtonStory(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const decreaseButton = canvas.getByRole('button', { name: 'decrease' });
    const increaseButton = canvas.getByRole('button', { name: 'increase' });
    const countInput = canvas.getByLabelText('count input');

    await userEvent.click(increaseButton);
    await userEvent.click(increaseButton);
    await userEvent.click(increaseButton);
    expect(countInput).toHaveValue('3');

    await delay(300);

    await userEvent.type(countInput, '4', { delay: 200 });
    expect(countInput).toHaveValue('34');

    await delay(300);

    await userEvent.click(decreaseButton);
    expect(countInput).toHaveValue('33');
  },
};
