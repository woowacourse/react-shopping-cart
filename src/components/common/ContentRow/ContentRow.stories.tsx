import type { Meta, StoryObj } from '@storybook/react';
import ContentRow from './ContentRow';

const meta = {
  title: 'Components/ContentRow',
  component: ContentRow,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: '',
      control: { type: 'text' },
    },
    content: {
      description: '',
      control: { type: 'text' },
    },
  },
  args: {
    title: '주문금액',
    content: '25,000원',
  },
} satisfies Meta<typeof ContentRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    () => {
      return (
        <div style={{ width: '380px' }}>
          <ContentRow title="주문금액" content="25,000원" />
        </div>
      );
    },
  ],
};
