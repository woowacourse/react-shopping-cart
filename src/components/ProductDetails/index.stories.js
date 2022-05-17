import ProductDetails from ".";

export default {
  title: "Presentational",
  component: ProductDetails,
};

const Template = (args) => <ProductDetails {...args} />;
export const ProductDetailsTemplate = Template.bind({});
ProductDetailsTemplate.args = {
  imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
  title: "록바1",
  price: 30000,
  isInShoppingCart: true,
};
