import type { Meta, StoryObj } from "@storybook/react";
import ProductQuantityInput from "../components/ProductQuantityInput/ProductQuantityInput";

/**
 * `ProductQuantityInput` 컴포넌트는 품목의 수량을 지정할 수 있는 인풋 형태의 컴포넌트입니다.
 * 수량이 `0` 이라면 장바구니 버튼을 보여주며, 그렇지 않을 경우 카운터와 인풋을 보여줍니다.
 */

const meta = {
  title: "ProductQuantityInput",
  component: ProductQuantityInput,
} satisfies Meta<typeof ProductQuantityInput>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: { productId: 8 },
};

export default meta;
