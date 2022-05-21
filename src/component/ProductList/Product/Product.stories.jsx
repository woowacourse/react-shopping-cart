import Product from '.';

export default {
  title: 'Component/Product',
  component: Product,
};

const Template = args => <Product {...args} />;

const DefaultProduct = Template.bind({});

DefaultProduct.args = {
  image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
  name: '사과',
  price: 1300,
};

export { DefaultProduct };
