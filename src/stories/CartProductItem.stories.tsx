import type { Meta, StoryObj } from "@storybook/react";
import CartProductItem from "../components/CartProductItem/CartProductItem";

/**
 * `CartProductItem` 는 사용자가 장바구니에 담아 둔 상품 하나를 관리할 수 있는 컴포넌트입니다.
 */
const meta = {
  title: "CartProductItem",
  component: CartProductItem,
} satisfies Meta<typeof CartProductItem>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    productId: 1,
    productImage:
      "https://user-images.githubusercontent.com/87642422/237034991-962fecb7-42cb-499f-b9c4-32ef863031ee.png",
    productName: "프리미엄 초콜릿 조각 케이크",
    productPrice: 9800,
    productQuantity: 0,
  },
};

export default meta;
