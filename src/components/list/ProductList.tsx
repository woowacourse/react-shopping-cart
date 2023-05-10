import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/types';
import ProductItem from '../box/ProductItem';

const ProductList = () => {
  const [data, setData] = useState<Product[]>([]);

  const getData = async () => {
    const res = await axios.get('/mock/mockData.json');
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ProductListWrapper>
      {data.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ProductListWrapper>
  );
};

export default ProductList;

const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  grid-column-gap: 47px;
  grid-row-gap: 75px;
`;
