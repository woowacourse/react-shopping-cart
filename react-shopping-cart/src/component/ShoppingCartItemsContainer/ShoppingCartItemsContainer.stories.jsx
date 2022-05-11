import ShoppingCartItemsContainer from "./ShoppingCartItemsContainer";

export default {
  title: "ShoppingCartItemsContainer",
  component: ShoppingCartItemsContainer,
};

export const DefaultShoppingCartItemsContainer = (args) => (
  <ShoppingCartItemsContainer {...args} />
);
DefaultShoppingCartItemsContainer.args = {};
