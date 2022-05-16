import Product from 'components/Main/Product';

export default {
  title: 'Product',
  component: Product,
};

function Template(args) {
  return <Product {...args} />;
}

export const DefaultProduct = Template.bind({});

DefaultProduct.args = {
  id: '123',
  src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9300000002853]_20210419104333070.jpg',
  price: '1500',
  title: '기운내라임',
};
