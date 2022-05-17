import ProductDeleteButton from "component/ShoppingCart/ProductDeleteButton/ProductDeleteButton";
import { Meta, Story } from "@storybook/react";

export default {
  title: "ProductDeleteButton",
  component: ProductDeleteButton,
} as Meta;

export const DefaultProductDeleteButton: Story = () => (
  <ProductDeleteButton>상품삭제</ProductDeleteButton>
);
