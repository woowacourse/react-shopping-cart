import ProductList from 'components/ProductList/ProductList';

export default {
  title: 'components/ProductList',
  component: ProductList,
};

const Template = (args) => <ProductList {...args} />;

export const Example = Template.bind({});

Example.args = {
  imgUrl:
    'https://woowacourse.github.io/shopping-cart-css/assets/images/product.png',
  name: 'PET보틀-정사각(420ml)',
  price: '48000',
};
