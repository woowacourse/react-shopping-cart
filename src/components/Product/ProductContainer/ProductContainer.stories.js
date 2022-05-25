import ProductContainer from 'components/Product/ProductContainer/ProductContainer';
import ProductItem from 'components/Product/ProductItem/ProductItem';
import { productList } from 'assets/mock';

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
