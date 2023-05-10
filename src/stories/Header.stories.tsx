import { Meta, StoryObj } from '@storybook/react';

import Header from '../components/Common/Header';
import { RecoilRoot } from 'recoil';

const meta = {
  title: 'Common/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
