import ShoppingCartItem from "component/ShoppingCart/ShoppingCartItem/ShoppingCartItem";
import { Meta, Story } from "@storybook/react";
import { CartItem } from "type";

export default {
  title: "ShoppingCartItem",
  component: ShoppingCartItem,
} as Meta;

export const DefaultShoppingCartItem: Story<CartItem> = (args) => (
  <ShoppingCartItem {...args} />
);
DefaultShoppingCartItem.args = {
  id: "sming1",
  thumbnail:
    "https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png",
  name: "[든든] 유부 슬라이스 500g",
  price: 42200,
};
