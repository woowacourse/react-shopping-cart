import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "../components/ProductCard/ProductCard";

/**
 * `Hello, World` 를 출력
 */
const meta = {
  title: "ProductCard",
  component: ProductCard,
} satisfies Meta<typeof ProductCard>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    productImage:
      "https://user-images.githubusercontent.com/87642422/237034964-aae42f44-a957-4083-b2ed-d1a65b91f7f7.png",
    proudctName: "소고기",
    productPrice: 43400,
  },
};

export default meta;
