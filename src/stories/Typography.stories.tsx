import { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../components/common/Typography';

const meta = {
  component: Typography,
  title: 'Common/Typography',
  args: {
    children: '장바구니 텍스트',
    weight: 'normal',
    $color: '#33333',
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: '16px',
  },
};

export const Medium: Story = {
  args: {
    size: '20px',
  },
};

export const Large: Story = {
  args: {
    size: '24px',
  },
};

export const Bold: Story = {
  args: {
    size: '24px',
    weight: '900',
  },
};
