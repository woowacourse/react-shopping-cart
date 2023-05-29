import type { Meta, StoryObj } from "@storybook/react";
import RectangleQuantityInput from "../components/RectangleQuantityInput/RectangleQuantityInput";

/**
 * `RectangleQuantityInput` 컴포넌트는 품목의 수량을 지정할 수 있는 인풋 형태의 컴포넌트입니다.
 * 수량과 관계없이 인풋을 보여줍니다.
 */
const meta = {
  title: "RectangleQuantityInput",
  component: RectangleQuantityInput,
} satisfies Meta<typeof RectangleQuantityInput>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    productId: 1,
    initialValue: 0,
    minValue: 0,
    onChange: () => {},
  },
};

export default meta;
