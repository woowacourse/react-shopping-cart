import type { Meta, StoryObj } from '@storybook/react';
import ImageBox from './ImageBox';

const meta = {
  title: 'Components/ImageBox',
  component: ImageBox,
  tags: ['autodocs'],
} satisfies Meta<typeof ImageBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    src: 'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
    height: 112,
    width: 112,
  },
};
