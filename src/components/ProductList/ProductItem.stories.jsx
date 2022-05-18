import ProductItem from './ProductItem';

export default {
  title: 'ProductItem',
  component: ProductItem,
};

function Template(args) {
  return <ProductItem {...args} />;
}

export const DefaultProductItem = Template.bind({});

DefaultProductItem.args = {
  id: '123',
  src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9300000002853]_20210419104333070.jpg',
  price: '1500',
  title: '기운내라임',
};
