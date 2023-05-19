import type { Meta, StoryObj } from "@storybook/react";
import CartNotificationButton from "../components/CartNotificationButton/CartNotificationButton";

/**
 * 장바구니에 제품이 추가되면 카운트하고 보여주는 역할을 하는 컴포넌트입니다.
 */

const meta = {
  title: "CartNotificationButton",
  component: CartNotificationButton,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "black" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CartNotificationButton>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: { productCount: 8 },
};

export default meta;
