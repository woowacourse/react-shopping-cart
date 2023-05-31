import type { Meta, StoryObj } from "@storybook/react";
import Header from "../components/Header/Header";

/**
 * `Header` 는 프로젝트에서 헤더를 담당하는 컴포넌트입니다.
 * 현재로써는 우측 상단에 `CardNotificationButton` 을 활용하여 장바구니 품목 종류의 개수를 알려줍니다.
 */
const meta = {
  title: "Header",
  component: Header,
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    homeUrl: "/",
    cartViewPageUrl: "/",
  },
};

export default meta;
