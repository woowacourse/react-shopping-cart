import type { Meta, StoryObj } from "@storybook/react";
import SimpleButton from "../components/common/SimpleButton/SimpleButton";

/**
 * `SimpleButton` 는 다용도로 사용할 수 있는 기본 버튼 컴포넌트입니다.
 */
const meta = {
  title: "SimpleButton",
  component: SimpleButton,
} satisfies Meta<typeof SimpleButton>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    children: "주문하기",
    type: "button",
    width: "388px",
  },
};

export default meta;
