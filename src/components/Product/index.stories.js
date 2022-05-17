import Product from ".";

export default {
  title: "Presentational",
  component: Product,
};

const Template = (args) => <Product {...args} />;

export const ProductTemplate = Template.bind({});
ProductTemplate.args = {
  imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
  title: "드록바",
  price: 3000000,
  onClick: () => {},
  go: () => {},
  isInShoppingCart: true,
};
