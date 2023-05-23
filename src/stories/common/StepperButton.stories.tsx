import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import StepperButton from '../../components/common/StepperButton/StepperButton';
import { useCount } from '../../hooks/common/useCount';
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
  },
  args: {
    minCount: 0,
    maxCount: 100,
  },
} satisfies Meta<typeof StepperButton>;

export default meta;
type Story = StoryObj<typeof StepperButton>;

const createStepperButtonStory = () => ({
  render: ({ ...args }) => {
    const { count, handleCountChange } = useCount(args.minCount);

    return (
      <StepperButton
        count={count}
        minCount={args.minCount}
        maxCount={args.maxCount}
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

    const decreaseButton = canvas.getByRole('button', { name: '카운트 감소' });
    const increaseButton = canvas.getByRole('button', { name: '카운트 증가' });
    const countInput = canvas.getByLabelText('카운트 입력');

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
