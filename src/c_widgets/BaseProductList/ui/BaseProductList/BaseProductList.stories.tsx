import { mockProducts } from '../../../../../mocks';

import { BaseProductList } from './BaseProductList';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BaseProductList> = {
  title: 'widgets/BaseProductList',
  component: BaseProductList,
  decorators: [
    (Story) => (
      <div style={{ width: '90vw', padding: '10px', border: '1px dashed black' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    products: mockProducts.slice(0, 5),
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
    leftActionSlot: () => <div style={style}>leftActionSlot</div>,
    rightActionSlot: () => <div style={style}>rightActionSlot</div>,
    counterSlot: () => <div style={style}>CounterSlot</div>,
  },
};
