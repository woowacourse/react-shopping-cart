import { RecoilRoot } from 'recoil';

import { PaymentSummary } from './PaymentSummary';

import type { Meta, StoryObj } from '@storybook/react';

// TODO: Connect to state
const meta: Meta<typeof PaymentSummary> = {
  title: '3. widgets/PaymentSummary',
  component: PaymentSummary,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <div style={{ width: '60vw', border: '1px dashed black', padding: '20px', backgroundColor: 'white' }}>
          <Story />
        </div>
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PaymentSummary>;

export const Common: Story = {};
