import { memo } from 'react';
import styled from 'styled-components';
import { ReactComponent as ShoppingCartImg } from '../../assets/icon/shopping-cart.svg';
import useCartAtom from '../../hooks/useCartAtom';
import { Product } from '../../types/product';
import Counter from '../common/Counter/Counter';
import ProductImg from './ProductImg/ProductImg';
import ProductInfo from './ProductInfo/ProductInfo';

const ProductCard = ({ id, name, price, imageUrl }: Product) => {
  const { count, addToCart, plusOne, minusOne } = useCartAtom(id, {
    id,
    name,
    price,
    imageUrl,
  });

  return (
    <Container>
      <ProductImg
        imageUrl={imageUrl}
        size={{ width: '282px', height: '282px' }}
      />
      <ProductDetail>
        <ProductInfo name={name} price={price} />
        {count > 0 ? (
          <Counter plusOne={plusOne} minusOne={minusOne} quantity={count} />
        ) : (
          <ShoppingCart onClick={addToCart}>
            <ShoppingCartImg />
          </ShoppingCart>
        )}
      </ProductDetail>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 282px;
`;

const ProductDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ShoppingCart = styled.button`
  display: flex;

  cursor: pointer;
`;

export default memo(ProductCard);
