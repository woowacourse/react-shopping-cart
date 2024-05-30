import { Information } from './Information';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Information> = {
  title: '6. shared/Information',
  component: Information,
  decorators: [
    (Story) => (
      <div style={{ padding: '10px', backgroundColor: 'white' }}>
        <Story />
      </div>
    ),
  ],
  render: () => <Information>This is information</Information>,
};

export default meta;

type Story = StoryObj<typeof Information>;

export const Common: Story = {};
