import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '.';

/**
 * `Checkbox`은 특정 아이템을 선택하는 이벤트에 대한 UI를 제공하는 컴포넌트입니다.
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Checkbox',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const DefaultCheckbox: Story = {
  args: {
    isChecked: false,
  },
};

export const CheckedBox: Story = {
  args: {
    isChecked: true,
  },
};

export const SmallCheckbox: Story = {
  args: {
    isChecked: false,
    size: 'small',
  },
};

export const MediumCheckbox: Story = {
  args: {
    isChecked: false,
    size: 'medium',
  },
};

export const LargeCheckbox: Story = {
  args: {
    isChecked: false,
    size: 'large',
  },
};
