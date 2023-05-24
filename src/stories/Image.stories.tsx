import { Meta, StoryObj } from '@storybook/react';
import { Image } from '../components/common/Image';

const meta = {
  component: Image,
  title: 'Common/Image',
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    width: '144px',
    height: '144px',
    source: '/assets/2.png',
    alternative: '상품 이미지',
  },
};

export const Large: Story = {
  args: {
    width: '282px',
    height: '282px',
    source: '/assets/2.png',
    alternative: '상품 이미지',
  },
};
