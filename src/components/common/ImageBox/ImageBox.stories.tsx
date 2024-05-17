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
    src: 'https://camo.githubusercontent.com/3d3976a541f327a8642d3d507d6fbb7930bfb9431035f1f883f9d86b97ad91a0/68747470733a2f2f70616b78652e73332e61702d6e6f727468656173742d322e616d617a6f6e6177732e636f6d2f50726f6d70744d6f64616c2e706e67',
    height: 500,
    width: 300,
  },
};
