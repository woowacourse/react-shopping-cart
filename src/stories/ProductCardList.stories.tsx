import type { Meta, StoryObj } from "@storybook/react";
import ProductCardList from "../components/ProductCardList/ProductCardList";

/** 
  `ProductCardList` 는 `ProductCard` 컴포넌트 하나 또는 여러 개로 구성된, 품목들을 나열하여 보여주기 위한 컴포넌트입니다.
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
