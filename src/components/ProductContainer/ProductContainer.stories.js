import { productList } from 'assets/mock';
import ProductContainer from 'components/ProductContainer';
import ProductItem from 'components/ProductItem';

export default {
  title: 'components/ProductContainer',
  component: ProductContainer,
};

const Template = (args) => <ProductContainer {...args} />;

export const Example = Template.bind({});

const productItems = productList.map((product, index) => (
  <ProductItem
    key={index}
    name={product.name}
    price={product.price}
    imgUrl={product.imgUrl}
  />
));

Example.args = {
  children: productItems,
};
