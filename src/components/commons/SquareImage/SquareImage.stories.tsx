import type { Meta, StoryObj } from '@storybook/react';

import SquareImage from '@components/commons/SquareImage/SquareImage';

const meta: Meta<typeof SquareImage> = {
  title: 'SquareImage',
  component: SquareImage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SquareImage>;

export const Default: Story = {
  args: {
    src: '',
    alt: 'test',
    size: 's',
  },
};
