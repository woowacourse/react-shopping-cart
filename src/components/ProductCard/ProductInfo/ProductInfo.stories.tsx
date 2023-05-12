import type { Meta, StoryObj } from "@storybook/react";
import ProductInfo from ".";

const meta: Meta<typeof ProductInfo> = {
  title: "ProductCard/ProductInfo",
  component: ProductInfo,
};

export default meta;

type Story = StoryObj<typeof ProductInfo>;

export const Default: Story = {
  args: {
    name: "PET보틀-정사각(420ml)",
    price: 10000,
  },
};
