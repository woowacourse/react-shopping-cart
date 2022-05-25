import ProductItem from 'components/Product/ProductItem/ProductItem';

export default {
  title: 'components/ProductItem',
  component: ProductItem,
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = (args) => <ProductItem {...args} />;

export const Example = Template.bind({});

Example.args = {
  id: 1,
  imgUrl:
    'https://woowacourse.github.io/shopping-cart-css/assets/images/product.png',
  name: 'PET보틀-정사각(420ml)',
  price: '48000',
};
