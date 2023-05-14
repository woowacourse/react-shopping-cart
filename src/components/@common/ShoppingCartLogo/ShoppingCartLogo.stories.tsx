import type { Meta, StoryObj } from '@storybook/react';
import ShoppingCartLogo from './ShoppingCartLogo';

const meta: Meta<typeof ShoppingCartLogo> = {
  title: 'ShoppingCartLogo',
  component: ShoppingCartLogo,
  argTypes: {
    fill: {
      control: {
        type: 'color',
      },
    },
    isFlipped: {
      control: {
        type: 'boolean',
      },
    },
    width: {
      control: {
        type: 'number',
      },
    },
    height: {
      control: {
        type: 'number',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    width: 200,
    height: 200,
    isFlipped: false,
    fill: '#000',
  },
};
