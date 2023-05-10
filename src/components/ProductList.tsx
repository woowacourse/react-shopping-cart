import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import ProductItem from './ProductItem';
import { fetchData } from '../utils/fetchData';
import { Product } from '../types';
import { mockDataUrl } from '../constants/url';

const ProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  const productData = process.env.PUBLIC_URL + mockDataUrl;

  useEffect(() => {
    fetchData<Product[]>(productData, setProductList);
  }, [productData]);

  return (
    <S.Wrapper>
      {productList.map((product) => (
        <ProductItem
          key={product.id}
          imgUrl={`${process.env.PUBLIC_URL}${product.imageUrl}`}
          name={product.name}
          price={product.price}
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
    gap: 86px 48px;
    width: 1270px;
    margin: 0 auto;
  `,
};

export default ProductList;
