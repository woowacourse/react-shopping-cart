import { useState } from 'react';
import styled from 'styled-components';

import CartIcon from '../../assets/CartIcon';
import type { Product } from '../../types/product';
import AmountCounter from '../Common/AmountCounter';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { imageUrl, name, price } = product;

  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount((prev) => prev + 1);
  };

  const subtractCount = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <ProductContainer>
      <ProductImage src={imageUrl} alt={name} />
      <ProductInfoContainer>
        <dl>
          <ProductName>{name}</ProductName>
          <ProductPrice>{price.toLocaleString('ko-KR')} 원</ProductPrice>
        </dl>
        {count === 0 ? (
          <ProductCartBtn type='button' onClick={addCount}>
            <CartIcon width={25} height={22} color='var(--gray-400)' />
          </ProductCartBtn>
        ) : (
          <AmountCounter
            count={count}
            addCount={addCount}
            subtractCount={subtractCount}
          />
        )}
      </ProductInfoContainer>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  width: 282px;
`;

const ProductImage = styled.img`
  width: 282px;
  height: 282px;
`;

const ProductInfoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  padding: 0 14px;
`;

const ProductName = styled.dt`
  line-height: 22px;
`;

const ProductPrice = styled.dd`
  font-size: 20px;
  line-height: 26.67px;
`;

const ProductCartBtn = styled.button`
  position: absolute;
  top: 0;
  right: 14px;
`;

export default ProductItem;
