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
      options: ['s', 'm', 'l'],
    },
    width: {
      description:
        '(optional) Determines the width setting for the button\'s CSS. "fixed" maintains a constant width, "fit" adjusts to the text size, and "full" expands to the full width of its container.',
      control: { type: 'radio' },
      options: ['fit', 'full'],
    },
    radius: {
      description:
        '(optional) Determines the width setting for the button\'s CSS. "fixed" maintains a constant width, "fit" adjusts to the text size, and "full" expands to the full width of its container.',
      control: { type: 'radio' },
      options: ['s', 'm', 'l'],
    },
    // buttonStyle: {
    //   description: '(optional) Specifies the style of the button. "primary" for a solid fill, "border" for a bordered style without fill, and "text" for a flat style without border or background.',
    //   control: { type: 'radio' },
    //   options: ['primary', 'border', 'text']
    // },
    // primaryColor: {
    //   description: '(optional) Sets the primary color of the button, used for the background in "primary" style, and the text and border in "border" and "text" styles.',
    //   control: { type: 'color' }
    // },
    // disabled: {
    //   description: '(optional) Specifies whether the button is disabled. When true, the button becomes unclickable and is usually styled to indicate it is inactive.',
    //   control: { type: 'boolean' }
    // },
    // text: {
    //   description: '(required) The text displayed on the button. This is the primary content of the button and should clearly communicate its action.',
    //   control: { type: 'text' }
    // },
    onClick: {
      description:
        '(required) The function that is called when the button is clicked. This handler is triggered on user interaction with the button.',
    },
  },
  args: {
    size: 's',
    width: 'fit',
    radius: 'm',
    children: 'button',
    // buttonStyle: 'primary',
    // primaryColor: '#333333',
    // disabled: false,
    // text: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
