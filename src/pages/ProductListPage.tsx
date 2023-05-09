import { atom } from 'recoil';

import Header from '../components/Header/Header';
import ProductList from '../components/ProductList/ProductList';

export const productListState = atom({
  key: 'productList',
  default: [
    {
      id: 3,
      name: '맛있는 삼겹살',
      price: 10000,
      imageUrl:
        'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201702/27/117f5b49-1d09-4550-8ab7-87c0d82614de.jpg',
    },
  ],
});

const ProductListPage = () => {
  return (
    <>
      <Header />
      <main>
        <ProductList />
      </main>
    </>
  );
};

export default ProductListPage;
