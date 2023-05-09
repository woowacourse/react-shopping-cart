import styled from 'styled-components';

import { CartIcon } from '../../assets';
import { Product } from '../../types/product';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { imageUrl, name, price } = product;

  return (
    <ProductContainer>
      <ProductImage src={imageUrl} alt={name} />
      <ProductInfoContainer>
        <dl>
          <ProductName>{name}</ProductName>
          <ProductPrice>{price.toLocaleString('ko-KR')} 원</ProductPrice>
        </dl>
        <ProductCartBtn type='button'>
          <CartIcon />
        </ProductCartBtn>
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

  :hover {
    transform: scale(1.1);
    transition: all 100ms ease-in;
  }
`;

export default ProductItem;
