import ProductQuantity from ".";

export default {
  title: "Presentational",
  component: ProductQuantity,
};

const Template = (args) => <ProductQuantity {...args} />;
export const ProductQuantityTemplate = Template.bind({});
ProductQuantityTemplate.args = {
  productQuantity: 1,
  imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
  title: "망고",
  price: 4000,
  handleIncrement: () => {},
  handleDecrement: () => {},
};
