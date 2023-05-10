import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import fetchProductList from '../../api/productList';
import { Product } from '../../types/product';
import ProductCard from '../ProductCard';

const ProductCardList = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductList<Product[]>();
      setProductList(data);
    };
    getProduct();
  }, [productList]);

  return (
    <Styled.Container>
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 80px 45px;
  `,
};
export default ProductCardList;
