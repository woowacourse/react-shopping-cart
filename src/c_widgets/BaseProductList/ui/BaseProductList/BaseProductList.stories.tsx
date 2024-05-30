import { mockCarts } from '../../../../../mocks';

import { BaseProductList } from './BaseProductList';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BaseProductList> = {
  title: '3. widgets/BaseProductList',
  component: BaseProductList,
  decorators: [
    (Story) => (
      <div style={{ width: '90vw', padding: '10px', border: '1px dashed black' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    cartItems: mockCarts.slice(0, 5),
  },
};

export default meta;

type Story = StoryObj<typeof BaseProductList>;

const style = {
  border: '1px dashed black',
  padding: '3px',
};

export const Common: Story = {};

export const AllSlotFilled: Story = {
  args: {
    cardLeftActionSlot: () => <div style={style}>leftActionSlot</div>,
    cardRightActionSlot: () => <div style={style}>rightActionSlot</div>,
    cardCounterSlot: () => <div style={style}>CounterSlot</div>,
  },
};
