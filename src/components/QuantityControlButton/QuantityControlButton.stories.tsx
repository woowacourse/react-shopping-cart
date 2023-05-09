import type { Meta, StoryObj } from '@storybook/react';

import QuantityControlButton from '.';

/**
 * `QuantityControlButton`은 물품의 수량을 보여주고 증감을 조절하는 역할을 하는 기본적인 컴포넌트입니다.
 */
const meta: Meta<typeof QuantityControlButton> = {
  title: 'QuantityControlButton',
  component: QuantityControlButton,
};

export default meta;

type Story = StoryObj<typeof QuantityControlButton>;

export const DefaultQuantityControlButton: Story = {
  args: {},
};
