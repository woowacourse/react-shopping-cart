import type { Meta, StoryObj } from "@storybook/react";
import CheckBox from "../components/common/CheckBox/CheckBox";

/**
 * `CheckBox` 는 여러 컴포넌트에서 범용적으로 사용할 수 있는 기본 체크박스 컴포넌트입니다.
 */
const meta = {
  title: "CheckBox",
  component: CheckBox,
} satisfies Meta<typeof CheckBox>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: { notifyParentWhenCheckedChanged: () => {} },
};

export default meta;
