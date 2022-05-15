import ProductName from "component/@shared/ProductName/ProductName";

export default {
  title: "ProductName",
  component: ProductName,
};

const Template = (args) => (
  <ProductName {...args}>PET보틀-정사각(420ml)</ProductName>
);

export const CardProductName = Template.bind({});
CardProductName.args = {
  type: "card",
};

export const DetailProductName = Template.bind({});
DetailProductName.args = {
  type: "detail",
};

export const ShoppingCartProductName = Template.bind({});
ShoppingCartProductName.args = {
  type: "shoppingCart",
};
