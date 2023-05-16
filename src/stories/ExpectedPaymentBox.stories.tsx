import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import ExpectedPaymentBox from '../components/Cart/ExpectedPaymentBox';

const meta = {
  title: 'Cart/ExpectedPaymentBox',
  component: ExpectedPaymentBox,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
} satisfies Meta<typeof ExpectedPaymentBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
