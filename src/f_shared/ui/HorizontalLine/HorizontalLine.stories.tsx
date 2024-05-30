import { HorizontalLine } from './HorizontalLine';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HorizontalLine> = {
  title: '6. shared/HorizontalLine',
  component: HorizontalLine,
  decorators: [
    (Story) => {
      const style: Record<string, string> = {
        width: '100%',
        height: '30px',
        backgroundColor: 'lightgray',
        textAlign: 'center',
      };
      return (
        <div style={{ width: '90vw' }}>
          <div style={style}>Dummy Component</div>
          <Story />
          <div style={style}>Dummy Component</div>
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof HorizontalLine>;

export const Common: Story = {};

export const Opacity: Story = {
  args: {
    opacity: 0.5,
  },
};

export const Color: Story = {
  args: {
    color: 'red',
  },
};

export const Height: Story = {
  args: {
    height: 5,
  },
};

export const Margin: Story = {
  args: {
    marginTop: 20,
    marginBottom: 20,
  },
};
