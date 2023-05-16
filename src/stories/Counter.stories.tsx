import { createRef } from 'react';

import { GlobalStyle } from '../GlobalStyle';
import { Counter } from '../components/productCard/Counter';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Counter',
  component: Counter,
  decorators: [
    (Story) => (
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const inputRef = createRef<HTMLInputElement>();

const handleIncrease = () => {
  if (inputRef === null) return;
  if (!(inputRef.current instanceof HTMLInputElement)) return;

  inputRef.current.stepUp();
};

const handleDecrease = () => {
  if (inputRef === null) return;
  if (!(inputRef.current instanceof HTMLInputElement)) return;

  if (Number(inputRef.current.value) <= 0) return;

  inputRef.current.stepDown();
};

export const CounterComponent: Story = {
  args: {
    ref: inputRef,
    handleDecrease: handleDecrease,
    handleIncrease: handleIncrease,
  },
};
