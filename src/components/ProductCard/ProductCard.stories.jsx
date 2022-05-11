import ProductCard from './ProductCard';

export default {
  title: 'Component/ProductCard',
  component: ProductCard,
};

function Template(args) {
  return <ProductCard {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  product: {
    name: '[든든] 전처리 양파 다이스 15mm(1.5*1.5*1.5/국내산) 1KG',
    price: '3940',
    image:
      'https://user-images.githubusercontent.com/44823900/167772500-dff4dfb5-6ad2-48fe-937d-81bc6800d0e2.jpg',
    description: '전처리 양파 다이스',
    stock: 76,
    brandId: '1',
    categoryId: '1',
    createdAt: 1652193534410,
    id: 1,
  },
};
