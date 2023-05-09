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
    $width: '144px',
    $height: '144px',
    source:
      'https://image.idus.com/image/files/819fc904143c42d3bc973a07a089faff_720.jpg',
    alternative: '상품 이미지',
  },
};

export const Large: Story = {
  args: {
    $width: '282px',
    $height: '282px',
    source:
      'https://image.idus.com/image/files/819fc904143c42d3bc973a07a089faff_720.jpg',
    alternative: '상품 이미지',
  },
};
