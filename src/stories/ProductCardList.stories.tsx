import type { Meta, StoryObj } from "@storybook/react";
import ProductCardList from "../components/ProductCardList/ProductCardList";

/**
 각 제품의 전체 정보를 담고 있는 ProductCardList 컴포넌트입니다.
 */
const meta = {
  title: "ProductCardList",
  component: ProductCardList,
} satisfies Meta<typeof ProductCardList>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {},
};

export default meta;
