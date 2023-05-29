import type { Meta, StoryObj } from '@storybook/react';

import { SquareImage } from '@commons/SquareImage/SquareImage';

/**
 * 정사각형 이미지 컴포넌트
 */

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
