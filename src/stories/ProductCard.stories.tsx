import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "../components/ProductCard/ProductCard";

/** 
  각각의 제품 정보를 나타내는 ProductCard 컴포넌트입니다.

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
