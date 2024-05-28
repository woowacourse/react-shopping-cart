import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description:
        '(optional) Specifies the size of the button. Choices are "small", "medium" (default), or "large", affecting the button’s padding and font size.',
      control: { type: 'radio' },
      options: ['s', 'm', 'l', 'fit'],
    },
    width: {
      description:
        '(optional) Determines the width setting for the button\'s CSS. "fixed" maintains a constant width, "fit" adjusts to the text size, and "full" expands to the full width of its container.',
      control: { type: 'radio' },
      options: ['fit', 'full', 'custom'],
    },
    radius: {
      description:
        '(optional) Determines the width setting for the button\'s CSS. "fixed" maintains a constant width, "fit" adjusts to the text size, and "full" expands to the full width of its container.',
      control: { type: 'radio' },
      options: ['s', 'm', 'l', 'custom'],
    },
    color: {
      description:
        '(optional) Determines the width setting for the button\'s CSS. "fixed" maintains a constant width, "fit" adjusts to the text size, and "full" expands to the full width of its container.',
      control: { type: 'radio' },
      options: ['default', 'primary'],
    },
    isSquare: {
      description:
        '(optional) Determines the width setting for the button\'s CSS. "fixed" maintains a constant width, "fit" adjusts to the text size, and "full" expands to the full width of its container.',
      control: { type: 'boolean' },
    },
    disabled: {
      description:
        '(required) The function that is called when the button is clicked. This handler is triggered on user interaction with the button.',
      control: { type: 'boolean' },
    },
    onClick: {
      description:
        '(required) The function that is called when the button is clicked. This handler is triggered on user interaction with the button.',
    },
    children: {
      description:
        '(required) The function that is called when the button is clicked. This handler is triggered on user interaction with the button.',
      control: { type: 'text' },
    },
  },
  args: {
    size: 's',
    width: 'fit',
    radius: 'm',
    color: 'default',
    isSquare: false,
    disabled: false,
    children: 'button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return <Button {...args}>{args.children}</Button>;
  },
};
