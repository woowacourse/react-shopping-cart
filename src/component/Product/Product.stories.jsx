import Product from 'component/Product/Product';

export default {
  title: 'Component/Product',
  component: Product,
};

const Template = args => <Product {...args} />;

const DefaultProduct = Template.bind({});

export { DefaultProduct };
