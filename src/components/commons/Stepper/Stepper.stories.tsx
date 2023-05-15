import type { Meta, StoryObj } from '@storybook/react';

import Stepper from './Stepper';
import { RecoilRoot } from 'recoil';

const meta: Meta<typeof Stepper> = {
  title: 'Stepper',
  component: Stepper,
  tags: ['autodocs'],
  decorators: [
    (Story) => <RecoilRoot><Story/></RecoilRoot>
  ],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    productId: 1,
    min: 0,
    max: 99,
    step: 1,
  },
};
