import ShoppingCartItem from "component/ShoppingCartItem/ShoppingCartItem";

export default {
  title: "ShoppingCartItem",
  component: ShoppingCartItem,
};

export const DefaultShoppingCartItem = (args) => <ShoppingCartItem {...args} />;
DefaultShoppingCartItem.args = {
  thumbnail:
    "https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png",
  name: "[든든] 유부 슬라이스 500g",
  price: "42,200",
};
