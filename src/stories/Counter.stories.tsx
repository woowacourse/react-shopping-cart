import { Counter } from "../components/productCard/Counter";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Counter",
  component: Counter,
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CounterComponent: Story = {
  args: {
    removeItemFromCartList: () => {
      alert("카운터 숫자가 0이 되면 장바구니에서 상품이 제거됩니다.");
    },
  },
};
