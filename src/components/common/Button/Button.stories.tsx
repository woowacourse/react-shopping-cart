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
    customWidth: {
      if: { arg: 'width', eq: 'custom' },
      description:
        '(optional) Determines the width setting for the button\'s CSS. "fixed" maintains a constant width, "fit" adjusts to the text size, and "full" expands to the full width of its container.',
      control: { type: 'number' },
    },
    radius: {
      description:
        '(optional) Determines the width setting for the button\'s CSS. "fixed" maintains a constant width, "fit" adjusts to the text size, and "full" expands to the full width of its container.',
      control: { type: 'radio' },
      options: ['s', 'm', 'l', 'custom'],
    },
    customRadius: {
      if: { arg: 'radius', eq: 'custom' },
      description:
        '(optional) Determines the width setting for the button\'s CSS. "fixed" maintains a constant width, "fit" adjusts to the text size, and "full" expands to the full width of its container.',
      control: { type: 'number' },
    },
    color: {
      description:
        '(optional) Determines the width setting for the button\'s CSS. "fixed" maintains a constant width, "fit" adjusts to the text size, and "full" expands to the full width of its container.',
      control: { type: 'radio' },
      options: ['default', 'primary'],
    },
    square: {
      description:
        '(optional) Determines the width setting for the button\'s CSS. "fixed" maintains a constant width, "fit" adjusts to the text size, and "full" expands to the full width of its container.',
      control: { type: 'boolean' },
    },
    isDisabled: {
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
    customWidth: 0,
    radius: 'm',
    customRadius: 0,
    color: 'default',
    square: false,
    isDisabled: false,
    children: 'button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }) => {
    if (args.customWidth) {
      args.width = args.customWidth;
    }
    if (args.customRadius) {
      args.radius = args.customRadius;
    }
    return <Button {...args}>{args.children}</Button>;
  },
};
