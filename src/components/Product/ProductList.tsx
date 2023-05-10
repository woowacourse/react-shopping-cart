import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import ProductItem from './ProductItem';

import useCartProductStorage from '../../hooks/useCartProductStorage';
import { cartProductState } from '../../states/cartProductState';
import type { Product } from '../../types/product';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductState);
  const [storedCartProducts, setStoredCartProducts] = useCartProductStorage();

  useEffect(() => {
    if (cartProducts.length !== 0) {
      setStoredCartProducts(cartProducts);
    }
  }, [cartProducts, setStoredCartProducts]);

  useEffect(() => {
    if (cartProducts.length > 0) return;

    if (storedCartProducts.length !== 0) {
      setCartProducts(storedCartProducts);
    }
  }, [cartProducts.length, setCartProducts, storedCartProducts]);

  return (
    <ProductListContainer>
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
    </ProductListContainer>
  );
};

const ProductListContainer = styled.ul`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 282px);
  grid-row-gap: 84px;
  grid-column-gap: 48px;
`;

export default ProductList;
