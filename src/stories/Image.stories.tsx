import { Meta, StoryObj } from '@storybook/react';

import Image from '../components/Common/Image';

const meta = {
  title: 'Common/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    src: 'images/정사각-420.jpeg',
  },
};
