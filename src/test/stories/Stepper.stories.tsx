import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { Stepper } from 'components/ProductCardList/ProductCard/Stepper';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { delay, delayClick } from 'test/stories/utils';

const meta = {
  component: Stepper,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div data-testid="outsideArea" style={{ padding: '4px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

const StepperWithHooks = () => {
  const [value, setValue] = useState(0);

  const increaseValue = () => {
    setValue((prev) => prev + 1);
  };

  const decreaseValue = () => {
    setValue((prev) => prev - 1);
  };

  return (
    <Stepper
      value={value}
      onClickClosed={increaseValue}
      onClickDecreaseButton={decreaseValue}
      onClickIncreaseButton={increaseValue}
    ></Stepper>
  );
};

export const Default: Story = {
  render: () => <StepperWithHooks />,
};

export const Interaction_Increase_And_Decrease: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const cartButton = canvas.getByRole('button');
    await delayClick(cartButton);

    const decreaseButton = canvas.getAllByRole('button')[0];
    const increaseButton = canvas.getAllByRole('button')[1];

    await delayClick(increaseButton);
    await delayClick(increaseButton);
    await delayClick(increaseButton);

    const quantity = canvas.getByTestId('quantity');

    expect(quantity).toHaveTextContent('4');

    await delayClick(decreaseButton);
    await delayClick(decreaseButton);
    await delayClick(decreaseButton);
    await delayClick(decreaseButton);

    const addCartButton = canvas.getByTestId('addCartButton');

    expect(addCartButton).toBeInTheDocument();
  },
  render: () => <StepperWithHooks />,
};

export const Interaction_Click_Outside_When_Opened: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const cartButton = canvas.getByRole('button');
    await delayClick(cartButton);

    let decreaseButton = canvas.getAllByRole('button')[0];
    const increaseButton = canvas.getAllByRole('button')[1];

    await delayClick(increaseButton);
    await delayClick(increaseButton);
    await delayClick(increaseButton);

    const outsideArea = canvas.getByTestId('outsideArea');
    await delayClick(outsideArea);

    decreaseButton = canvas.getAllByRole('button')[0];

    const quantityButton = canvas.getByText('4');
    await delayClick(quantityButton);
  },
  render: () => <StepperWithHooks />,
};
