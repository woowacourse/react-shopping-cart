import type { Meta, StoryObj } from "@storybook/react";
import OrderSummary from "../components/OrderSummary/OrderSummary";

/**
 * `OrderSummary` 는 결제 전 최종 정보를 사용자에게 보여주기 위한 메뉴입니다.
 * 총 상품 가격, 총 배송비, 총 주문금액에 해당하는 정보를 보여 주며, 최하단에는 주문하기 버튼이 있습니다.
 */
const meta = {
  title: "OrderSummary",
  component: OrderSummary,
} satisfies Meta<typeof OrderSummary>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {},
};

export default meta;
