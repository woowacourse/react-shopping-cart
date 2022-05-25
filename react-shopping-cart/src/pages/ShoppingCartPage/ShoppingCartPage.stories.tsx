import ShoppingCartPage from "pages/ShoppingCartPage/ShoppingCartPage";
import { Meta, Story } from "@storybook/react";

export default {
  title: "ShoppingCartPage",
  component: ShoppingCartPage,
} as Meta;

export const DefaultShoppingCartPage: Story = () => <ShoppingCartPage />;
