import type { Meta, StoryObj } from '@storybook/react';

import ShoppingItem from '.';

/**
 * `ShoppingItem`은 하나의 쇼핑 품목을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof ShoppingItem> = {
  title: 'ShoppingItem',
  component: ShoppingItem,
};

export default meta;

type Story = StoryObj<typeof ShoppingItem>;
