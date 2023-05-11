import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import ProductItem from './ProductItem';
import { fetchData } from '../utils/fetchData';
import { Product } from '../types';
import { MOCK_DATA_URL } from '../constants/url';

export const productListState = atom({
  key: 'productListState',
  default: [] as Product[],
});

const ProductList = () => {
  const [productList, setProductList] = useRecoilState<Product[]>(productListState);

  const productData = process.env.PUBLIC_URL + MOCK_DATA_URL;

  useEffect(() => {
    fetchData<Product[]>(productData, setProductList);
  }, [productData, setProductList]);

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
    grid-template-rows: repeat(3, 1fr);
    gap: 86px 4%;
    max-width: 1270px;
    margin: 0 auto;
    padding: 0 20px 120px;
  `,
};

export default ProductList;
