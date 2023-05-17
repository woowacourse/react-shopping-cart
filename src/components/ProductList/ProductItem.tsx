import React from 'react';
import styled from 'styled-components';
import useControlCart from '@hooks/useControlCart';
import { ProductInformation } from '@type/types';
import { theme } from '@styles/theme';
import AddCartButton from './AddCartButton';

interface ProductItemProps {
  product: ProductInformation;
}

const MAX_PRICE_LIMIT = 15;

const ProductItem = ({ product }: ProductItemProps) => {
  const { id, name, price, imageUrl } = product;
  const { addProductToCart } = useControlCart();

  const localePrice = price.toLocaleString('ko-KR');
  const slicedPrice =
    localePrice.length > MAX_PRICE_LIMIT
      ? `${localePrice.slice(0, MAX_PRICE_LIMIT)}...`
      : localePrice;

  return (
    <Wrapper>
      <Picture title={name} src={imageUrl} alt={name} />
      <InformationWrapper>
        <TitleAndPriceWrapper>
          <Title title={name}>{name}</Title>
          <Price title={`${localePrice} 원`}>{slicedPrice} 원</Price>
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
  cursor: pointer;
`;

const Picture = styled.img`
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
  max-width: calc(100% - 80px);
`;

const Title = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  letter-spacing: 0.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

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
