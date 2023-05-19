import type { Meta, StoryObj } from '@storybook/react';
import Header from '.';
import Providers from '../../stories/Providers';

const meta = {
  component: Header,
  title: 'Header',
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
