import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "../components/ProductCard/ProductCard";

/** 
  `ProductCard` 는 품목 하나에 대한 정보를 포함하고 있는 컴포넌트입니다.
*/
const meta = {
  title: "ProductCard",
  component: ProductCard,
} satisfies Meta<typeof ProductCard>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    productId: 1,
    productImage:
      "https://user-images.githubusercontent.com/87642422/237034964-aae42f44-a957-4083-b2ed-d1a65b91f7f7.png",
    productName: "소고기",
    productPrice: 43400,
  },
};

export default meta;
