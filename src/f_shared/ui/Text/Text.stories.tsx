import { Text } from './Text';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Text> = {
  title: 'shared/Text',
  component: Text,
  args: {
    children: 'text',
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const TypeH1: Story = {
  args: {
    type: 'h1',
  },
};

export const TypeH2: Story = {
  args: {
    type: 'h2',
  },
};

export const TypeB1: Story = {
  args: {
    type: 'b1',
  },
};

export const TypeB2: Story = {
  args: {
    type: 'b2',
  },
};

export const TagP: Story = {
  args: {
    tag: 'p',
  },
  render: () => (
    <div>
      <Text tag={'p'} type={'b1'}>
        text
      </Text>
      <Text tag={'p'} type={'b1'}>
        text
      </Text>
    </div>
  ),
};

export const TagSpan: Story = {
  args: {
    tag: 'p',
  },
  render: () => (
    <div>
      <Text tag={'span'} type={'b1'}>
        text
      </Text>
      <Text tag={'span'} type={'b1'}>
        text
      </Text>
    </div>
  ),
};
