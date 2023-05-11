import type { Meta, StoryObj } from '@storybook/react';
import Stepper from '../../components/Stepper';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

const meta = {
  title: 'ShoppingCart/common/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initCount: 1,
    productId: 1,
  },
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ClickPlusButton: Story = {
  args: {
    initCount: 1,
    productId: 1,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const countInput = await canvas.findByRole('textbox');
    const plusButton = await canvas.findByText('+');

    await delay(400);
    userEvent.click(plusButton);

    expect(countInput).toHaveValue('2');
  },
};

export const ClickMinusButton: Story = {
  args: {
    initCount: 5,
    productId: 1,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const countInput = await canvas.findByRole('textbox');
    const minusButton = await canvas.findByText('-');

    await delay(400);
    userEvent.click(minusButton);

    expect(countInput).toHaveValue('4');
  },
};

export const ButtonToDisableIfMinCount: Story = {
  args: {
    initCount: 2,
    productId: 1,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const countInput = await canvas.findByRole('textbox');
    const minusButton = await canvas.findByText('-');

    await delay(400);
    userEvent.click(minusButton);

    expect(countInput).toHaveValue('1');
    expect(minusButton).toBeDisabled();
  },
};

export const ButtonToDisableIfMaxCount: Story = {
  args: {
    initCount: 98,
    productId: 1,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const countInput = await canvas.findByRole('textbox');
    const plusButton = await canvas.findByText('+');

    await delay(400);
    userEvent.click(plusButton);

    expect(countInput).toHaveValue('99');
    expect(plusButton).toBeDisabled();
  },
};

export const CanNotBeOverMaxCount: Story = {
  args: {
    initCount: 1,
    productId: 1,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const countInput = await canvas.findByRole('textbox');
    const plusButton = await canvas.findByText('+');

    await userEvent.type(countInput, '100', { delay: 500 });

    expect(countInput).toHaveValue('99');
    expect(plusButton).toBeDisabled();
  },
};
