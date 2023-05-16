import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { ProductInformation } from '@type/types';
import { theme } from '@styles/theme';
import AddCartButton from './AddCartButton';

interface ProductItemProps {
  product: ProductInformation;
  addProductToCart: () => void;
  removeProductFromCart: () => void;
}

const ProductItem = ({
  product,
  addProductToCart,
  removeProductFromCart,
}: ProductItemProps) => {
  const cart = useRecoilValue(cartAtom);

  const { id, name, price, imageUrl } = product;

  const savedCartData = cart.find((item) => item.id === id);

  return (
    <Wrapper>
      <Picture src={imageUrl} alt={name} />
      <InformationWrapper>
        <TitleAndPriceWrapper>
          <Title>{name}</Title>
          <Price>{price.toLocaleString('ko-KR')} 원</Price>
        </TitleAndPriceWrapper>
        <AddCartButton
          quantity={savedCartData?.quantity}
          addProductToCart={addProductToCart}
          removeProductFromCart={removeProductFromCart}
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
