import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState } from 'react';
import Stepper from '../../components/Stepper';
import { PRODUCT } from '../../constants';

const meta = {
  title: 'ShoppingCart/common/Stepper',
  component: Stepper,
  tags: ['autodocs'],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createStepperStory = () => ({
  render: () => {
    const [quantity, setQuantity] = useState(1);
    return (
      <Stepper quantity={quantity} maxQuantity={PRODUCT.MAX_COUNT} updateQuantity={setQuantity} />
    );
  },
});

export const Default: Story = createStepperStory();

export const ClickPlusButton: Story = {
  ...createStepperStory(),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const countInput = await canvas.findByRole('textbox');
    const plusButton = await canvas.findByText('+');

    await delay(300);
    userEvent.click(plusButton);

    await delay(300);
    expect(countInput).toHaveValue('2');
  },
};

export const ClickMinusButton: Story = {
  ...createStepperStory(),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const countInput = await canvas.findByRole('textbox');
    const plusButton = await canvas.findByText('+');
    const minusButton = await canvas.findByText('-');

    await delay(300);
    userEvent.click(plusButton);

    await delay(300);
    userEvent.click(plusButton);

    await delay(300);
    userEvent.click(plusButton);

    await delay(300);
    userEvent.click(minusButton);

    await delay(300);
    expect(countInput).toHaveValue('3');
  },
};

export const ButtonToDisableIfMaxCount: Story = {
  ...createStepperStory(),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const countInput = await canvas.findByRole('textbox');
    const plusButton = await canvas.findByText('+');

    await delay(300);
    userEvent.type(countInput, '99');

    await delay(300);
    expect(countInput).toHaveValue('99');
    expect(plusButton).toBeDisabled();
  },
};

export const CanNotBeOverMaxCount: Story = {
  ...createStepperStory(),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const countInput = await canvas.findByRole('textbox');
    const plusButton = await canvas.findByText('+');

    await userEvent.type(countInput, '100', { delay: 500 });

    expect(countInput).toHaveValue('99');
    expect(plusButton).toBeDisabled();
  },
};
