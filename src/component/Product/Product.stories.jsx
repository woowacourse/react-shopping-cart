import { Product } from 'component';

export default {
  title: 'Component/Product',
  component: Product,
};

const Template = args => <Product {...args} />;

const DefaultProduct = Template.bind({});

export { DefaultProduct };
