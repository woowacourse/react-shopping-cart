import type { Meta, StoryObj } from '@storybook/react';

import QuantityController from '.';

/**
 * `QuantityControlButton`은 물품의 수량을 보여주고 증감을 조절하는 역할을 하는 기본적인 컴포넌트입니다.
 */
const meta: Meta<typeof QuantityController> = {
  title: 'QuantityController',
  component: QuantityController,
};

export default meta;

type Story = StoryObj<typeof QuantityController>;

export const DefaultQuantityController: Story = {
  args: { quantity: 1 },
};

export const ZeroQuantityController: Story = {
  args: { quantity: 0 },
};

export const MaxQuantityController: Story = {
  args: { quantity: 99 },
};
