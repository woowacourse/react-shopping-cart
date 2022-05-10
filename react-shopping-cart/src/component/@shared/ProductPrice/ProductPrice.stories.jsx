import ProductPrice from "./ProductPrice";

export default {
  title: "ProductPrice",
  component: ProductPrice,
};

const Template = (args) => <ProductPrice {...args}>43,400원</ProductPrice>;

export const CardProductPrice = Template.bind({});
CardProductPrice.args = {
  type: "card",
};

export const DetailProductPrice = Template.bind({});
DetailProductPrice.args = {
  type: "detail",
};

export const ShoppingCartProductPrice = Template.bind({});
ShoppingCartProductPrice.args = {
  type: "shoppingCart",
};
