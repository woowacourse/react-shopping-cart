import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '@commons/Checkbox/Checkbox';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

/**
 * 체크박스
 */

const meta: Meta<typeof Checkbox> = {
  title: 'Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    'aria-label': '체크박스',
  },
};

/**
 * 체크박스 클릭 상호작용 테스트
 */

export const Test: Story = {
  ...Default,

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const $checkbox = canvas.getByLabelText('체크박스');

    await step('빈 체크박스를 클릭하면 체크가 된다', async () => {
      await userEvent.click($checkbox);
      const $checked = canvas.getByLabelText('checked');
      expect($checked).toBeVisible();
    });

    await step('체크된 체크박스를 클릭하면 빈 체크박스가 된다', async () => {
      const $checked = canvas.getByLabelText('checked');
      await userEvent.click($checkbox);
      expect($checked).not.toBeVisible();
    });
  },
};
