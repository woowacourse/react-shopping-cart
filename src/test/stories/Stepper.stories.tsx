import { Meta, StoryObj } from '@storybook/react';
import { Stepper } from 'components/ProductCardList/ProductCard/Stepper';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

const meta = {
  component: Stepper,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
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

export const Closed: Story = {
  render: () => <StepperWithHooks />,
};
