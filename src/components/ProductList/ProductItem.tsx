import React from 'react';
import styled from 'styled-components';
import useControlCart from '@hooks/useControlCart';
import { ProductInformation } from '@type/types';
import { theme } from '@styles/theme';
import AddCartButton from './AddCartButton';

interface ProductItemProps {
  product: ProductInformation;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { id, name, price, imageUrl } = product;
  const { addProductToCart } = useControlCart();

  return (
    <Wrapper>
      <Picture src={imageUrl} alt={name} />
      <InformationWrapper>
        <TitleAndPriceWrapper>
          <Title>{name}</Title>
          <Price>{price.toLocaleString('ko-KR')} 원</Price>
        </TitleAndPriceWrapper>
        <AddCartButton
          id={id}
          addProductToCart={() => addProductToCart(product)}
        />
      </InformationWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 282px;
`;

const Picture = styled.img`
  width: 282px;
  height: 282px;

  margin-bottom: 18px;
`;

const InformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-left: 10px;
`;

const TitleAndPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

const Price = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

export default React.memo(ProductItem);
