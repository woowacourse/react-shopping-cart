import type { Meta, StoryObj } from "@storybook/react";
import FullWidthTitle from "../components/common/FullWidthTitle/FullWidthTitle";

/**
 * `FullWidthTitle` 는 가로 전체를 차지하는 제목 컴포넌트이며,
 * 주로 큰 범위(ex: 페이지)의 기능을 설명하는 제목으로 활용됩니다.
 */
const meta = {
  title: "FullWidthTitle",
  component: FullWidthTitle,
} satisfies Meta<typeof FullWidthTitle>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: { children: "여기에 제목 입력" },
};

export default meta;
