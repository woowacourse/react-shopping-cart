import type { Meta, StoryObj } from "@storybook/react";
import Loading from "../components/common/Loading/Loading";

/**
 * `Loading` 는 사용자에게 콘텐츠가 로딩중임을 시각적으로 알려주기 위한 기본 스피너입니다.
 */
const meta = {
  title: "Loading",
  component: Loading,
} satisfies Meta<typeof Loading>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {},
};

export default meta;
