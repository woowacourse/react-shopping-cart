import { atom, useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import ProductItem from './ProductItem';
import { useSetFetchedData } from '../hooks/useSetFetchedData';
import { Product } from '../types';
import { MOCK_DATA_URL } from '../constants/url';

export const productListState = atom<Product[]>({
  key: 'productListState',
  default: [],
});

const ProductList = () => {
  const [productList, setProductList] = useRecoilState<Product[]>(productListState);

  const productListUrl = process.env.PUBLIC_URL + MOCK_DATA_URL;

  useSetFetchedData<Product[]>(productListUrl, setProductList);

  return (
    <S.Wrapper>
      {productList.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imgUrl={`${process.env.PUBLIC_URL}${product.imageUrl}`}
        />
      ))}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 86px 4%;
    max-width: 1270px;
    margin: 0 auto;
    padding: 0 20px 120px;

    @media (max-width: 1270px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr);
    }
  `,
};

export default ProductList;
