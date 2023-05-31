import type { Meta, StoryObj } from "@storybook/react";
import TransformQuantityInput from "../components/TransformQuantityInput/TransformQuantityInput";

/**
 * `TransformQuantityInput` 컴포넌트는 품목의 수량을 지정할 수 있는 인풋 형태의 컴포넌트입니다.
 * 수량이 `0` 이라면 장바구니 버튼을 보여주며, 그렇지 않을 경우 카운터와 인풋을 보여줍니다.
 */

const meta = {
  title: "TransformQuantityInput",
  component: TransformQuantityInput,
} satisfies Meta<typeof TransformQuantityInput>;

type Story = StoryObj<typeof meta>;

export const ButtonMode: Story = {
  args: {
    productId: 1,
    initialValue: 0,
    minValue: 0,
    onChange: () => {},
  },
};

export const InputMode: Story = {
  args: {
    productId: 2,
    initialValue: 5,
    minValue: 0,
    onChange: () => {},
  },
};

export default meta;
