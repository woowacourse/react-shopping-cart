import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import ProductStepper from '@components/ProductStepper/ProductStepper';

/**
 * Stepper 컴포넌트
 */

const meta: Meta<typeof ProductStepper> = {
  title: 'ProductStepper',
  component: ProductStepper,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProductStepper>;

/**
 * Default 스토리
 */

export const Default: Story = {
  args: {
    productId: 1,
  },
};

/**
 * 상품을 추가하고 삭제하는 스토리
 */

export const StepperTest: Story = {
  ...Default,

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const entryButton = canvas.getByLabelText('장바구니에 상품 추가하기');

    await step('장바구니를 누르면 장바구니 아이콘이 사라진다', async () => {
      await userEvent.click(entryButton);
      expect(entryButton).not.toBeVisible();
    });

    const input = canvas.getByRole('textbox') as HTMLInputElement;
    const upButton = canvas.getByLabelText('상품 1개 추가');
    const downButton = canvas.getByLabelText('상품 1개 삭제');

    await step('장바구니가 사라지면, Stepper가 나온다', async () => {
      expect(input).toBeVisible();
      expect(upButton).toBeVisible();
      expect(downButton).toBeVisible();
    });

    await step(
      'Up 버튼을 클릭하면, 장바구니에 상품 개수가 늘어난다',
      async () => {
        await userEvent.click(upButton);
        const value = input.value;

        expect(value).toEqual('2');
      }
    );

    await step(
      'Down 버튼을 클릭하면, 장바구니의 상품 개수가 줄어든다',
      async () => {
        await userEvent.click(downButton);
        const value = input.value;

        expect(value).toEqual('1');
      }
    );

    await step(
      'Down 버튼을 클릭해 상품이 0개가 되면 Stepper가 사라지고 장바구니 아이콘이 나온다',
      async () => {
        await userEvent.click(downButton);

        expect(input).not.toBeVisible();
        expect(upButton).not.toBeVisible();
        expect(downButton).not.toBeVisible();
      }
    );
  },
};
