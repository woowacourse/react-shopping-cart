import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "./ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "ProductCard",
  component: ProductCard,
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    productId: 1,
  },
};
