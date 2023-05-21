import { Meta, StoryObj } from '@storybook/react';

import Image from '../components/Common/Image';

const meta = {
  title: 'Common/Image',
  component: Image,
  tags: ['autodocs'],
} satisfies Meta<typeof Image>;

const mockProduct = {
  id: 1,
  name: 'PET보틀-정사각(420ml)',
  price: 43400,
  imageUrl: 'images/정사각-420.jpeg',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { src: mockProduct.imageUrl, alt: mockProduct.name },
};
