import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import SquareImage from './SquareImage';

const meta: Meta<typeof SquareImage> = {
  title: 'SquareImage',
  component: SquareImage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SquareImage>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    alt: '선글라스를 낀 고양이',
    size: 's',
  },
};
