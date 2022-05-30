import ShoppingCartProduct from ".";

export default {
  title: "Presentational",
  component: ShoppingCartProduct,
};

const Template = (args) => <ShoppingCartProduct {...args} />;
export const ShoppingCartProductTemplate = Template.bind({});
ShoppingCartProductTemplate.args = {
  productQuantity: 1,
  imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
  title: "망고",
  price: 4000,
  handleIncrement: () => {},
  handleDecrement: () => {},
};
