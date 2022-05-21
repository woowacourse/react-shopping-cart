import ProductCardGrid from './ProductCardGrid';

export default {
  title: 'Component/ProductCardGrid',
  component: ProductCardGrid,
};

function Template(args) {
  return <ProductCardGrid {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  productList: [
    {
      id: '1',
      name: '[든든] 전처리 양파 다이스 15mm(1.5*1.5*1.5/국내산) 1KG',
      price: 3940,
      image:
        'https://user-images.githubusercontent.com/44823900/167772500-dff4dfb5-6ad2-48fe-937d-81bc6800d0e2.jpg',
      description: '전처리 양파 다이스',
      stock: 76,
      brandId: '1',
      categoryId: '1',
      createdAt: 1652193534410,
    },
    {
      id: '2',
      name: '[든든] 국내산 깐감자(100g 이상/EA) 1KG',
      price: 5750,
      image:
        'https://user-images.githubusercontent.com/44823900/167772807-6d640105-54d3-4648-b5b5-589a634861cd.jpg',
      description: '국내산 깐감자',
      stock: 100,
      brandId: '1',
      categoryId: '1',
      createdAt: 1652193545357,
    },
    {
      id: '3',
      name: '[든든] 전처리 양파 다이스 15mm(1.5*1.5*1.5/국내산) 1KG',
      price: 3940,
      image:
        'https://user-images.githubusercontent.com/44823900/167772500-dff4dfb5-6ad2-48fe-937d-81bc6800d0e2.jpg',
      description: '전처리 양파 다이스',
      stock: 76,
      brandId: '1',
      categoryId: '1',
      createdAt: 1652193534410,
    },
    {
      id: '4',
      name: '[든든] 국내산 깐감자(100g 이상/EA) 1KG',
      price: 5750,
      image:
        'https://user-images.githubusercontent.com/44823900/167772807-6d640105-54d3-4648-b5b5-589a634861cd.jpg',
      description: '국내산 깐감자',
      stock: 100,
      brandId: '1',
      categoryId: '1',
      createdAt: 1652193545357,
    },
    {
      id: '5',
      name: '[든든] 전처리 양파 다이스 15mm(1.5*1.5*1.5/국내산) 1KG',
      price: 3940,
      image:
        'https://user-images.githubusercontent.com/44823900/167772500-dff4dfb5-6ad2-48fe-937d-81bc6800d0e2.jpg',
      description: '전처리 양파 다이스',
      stock: 76,
      brandId: '1',
      categoryId: '1',
      createdAt: 1652193534410,
    },
    {
      id: '6',
      name: '[든든] 국내산 깐감자(100g 이상/EA) 1KG',
      price: 5750,
      image:
        'https://user-images.githubusercontent.com/44823900/167772807-6d640105-54d3-4648-b5b5-589a634861cd.jpg',
      description: '국내산 깐감자',
      stock: 100,
      brandId: '1',
      categoryId: '1',
      createdAt: 1652193545357,
    },
  ],
};
