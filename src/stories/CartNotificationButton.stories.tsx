import type { Meta, StoryObj } from "@storybook/react";
import CartNotificationButton from "../components/CartNotificationButton/CartNotificationButton";

/**
 * `CartNotificationButton` 은 사용자를 특정 주소로 안내하는 역할을 수행하면서, 특정 알림의 개수도 보여주도록 하고 싶을 때 사용할 수 있는 컴포넌트입니다.
 * 알림의 개수는 props의 인자로 넘겨 주는 것이 아닌, `recoil` 과 같은 상태관리 라이브러리를 사용하여 업데이트하는 방식입니다.
 *
 * 검은 배경은 컴포넌트를 보여주기 위함이며, 컴포넌트에 포함되지 않음에 주의하시기 바랍니다.
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
