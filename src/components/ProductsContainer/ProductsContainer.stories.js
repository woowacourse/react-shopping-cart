import ProductContainer from 'components/ProductContainer/ProductContainer';
import ProductItem from 'components/ProductItem/ProductItem';

export default {
  title: 'components/ProductContainer',
  component: ProductContainer,
};

const Template = (args) => <ProductContainer {...args} />;

export const Example = Template.bind({});

const mockProducts = [
  {
    imgUrl:
      'https://woowacourse.github.io/shopping-cart-css/assets/images/product.png',
    name: 'PET보틀-정사각(420ml)',
    price: '48000',
  },
  {
    imgUrl:
      'https://woowacourse.github.io/shopping-cart-css/assets/images/product.png',
    name: 'PET보틀-정사각(420ml)',
    price: '48000',
  },
  {
    imgUrl:
      'https://woowacourse.github.io/shopping-cart-css/assets/images/product.png',
    name: 'PET보틀-정사각(420ml)',
    price: '48000',
  },
  {
    imgUrl:
      'https://woowacourse.github.io/shopping-cart-css/assets/images/product.png',
    name: 'PET보틀-정사각(420ml)',
    price: '48000',
  },
  {
    imgUrl:
      'https://woowacourse.github.io/shopping-cart-css/assets/images/product.png',
    name: 'PET보틀-정사각(420ml)',
    price: '48000',
  },
];

const productItems = mockProducts.map((product, index) => (
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
