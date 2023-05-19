import type { Meta, StoryObj } from "@storybook/react";
import ProductQuantityInput from "../components/ProductQuantityInput/ProductQuantityInput";

/**
 * 제품의 수량을 입력하는 ProductQuantityInput 컴포넌트입니다.
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
