import styled from 'styled-components';
import Product from './Product';

const MOCK_PRODUCTS_INFO = [
  {
    id: '11',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[72]_20210415140949967.jpg',
    title: '핫초코',
    price: '18000',
  },
  {
    id: '22',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000487]_20210430112319040.jpg',
    title: '초코핫',
    price: '42000',
  },
  {
    id: '33',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[72]_20210415140949967.jpg',
    title: 'PET보틀-밀크티(370ml)',
    price: '3500',
  },
  {
    id: '44',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002672]_20220311105511600.jpg',
    title: '미지근 초코',
    price: '1500',
  },
  {
    id: '55',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000003988]_20220406113215251.jpg',
    title: '민트 초코',
    price: '28000',
  },
  {
    id: '66',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9300000002853]_20210419104333070.jpg',
    title: '기운내라임',
    price: '48000',
  },
];

function ProductListContainer() {
  return (
    <Styled.ProductListContainer>
      {MOCK_PRODUCTS_INFO.map(({ id, src, title, price }) => (
        <Product key={id} id={id} src={src} title={title} price={price} />
      ))}
    </Styled.ProductListContainer>
  );
}

const Styled = {
  ProductListContainer: styled.section`
    display: flex;
    justify-content: center;

    flex-wrap: wrap;
    gap: 20px;
    padding: 60px 240px;
  `,
};

export default ProductListContainer;
