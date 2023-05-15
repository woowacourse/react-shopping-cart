import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'common/Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SmallestText: Story = {
  args: {
    children: '다람쥐 헌 쳇바퀴 돌듯이',
    size: 'smallest',
  },
};

export const SmallText: Story = {
  args: {
    children: '다람쥐 헌 쳇바퀴 돌듯이',
    size: 'small',
  },
};

export const MediumText: Story = {
  args: {
    children: '다람쥐 헌 쳇바퀴 돌듯이',
    size: 'medium',
  },
};

export const LargeText: Story = {
  args: {
    children: '다람쥐 헌 쳇바퀴 돌듯이',
    size: 'large',
  },
};

export const LargestText: Story = {
  args: {
    children: '다람쥐 헌 쳇바퀴 돌듯이',
    size: 'largest',
  },
};
