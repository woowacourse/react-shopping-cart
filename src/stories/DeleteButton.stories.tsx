import type { Meta, StoryObj } from "@storybook/react";
import DeleteButton from "../components/common/DeleteButton/DeleteButton";

/**
 * `DeleteButton` 은 장바구니에 담은 품목을 삭제할 때 사용하는 버튼입니다.
 */
const meta = {
  title: "DeleteButton",
  component: DeleteButton,
} satisfies Meta<typeof DeleteButton>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: { productId: 1, notifyParentWhenDeleteTriggered: () => {} },
};

export default meta;
