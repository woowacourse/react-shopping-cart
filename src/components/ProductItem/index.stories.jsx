import ProductItem from '.';
import { dummyProductList } from 'dummy_data';

export default {
  title: 'Components/ProductItem',
  component: ProductItem,
  argTypes: {
    id: { control: 'select', options: dummyProductList.map(product => product.id) },
    name: { control: 'select', options: dummyProductList.map(product => product.name) },
    price: { control: 'select', options: dummyProductList.map(product => product.price) },
    image: { control: 'select', options: dummyProductList.map(product => product.image) },
  },
};

const Template = args => <ProductItem {...args} />;

export const ProductItemTemplate = Template.bind({});
ProductItemTemplate.args = {
  id: dummyProductList[0].id,
  name: dummyProductList[0].name,
  price: dummyProductList[0].price,
  image: dummyProductList[0].image,
};
