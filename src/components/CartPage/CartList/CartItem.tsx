import React from 'react';
import { PRODUCT_LIST } from '@mockData/productList';
import { styled } from 'styled-components';
import BucketCounter from '@components/common/BucketCounter';
import CheckBox from '@components/common/CheckBox';
import { TRASH_LOGO } from '@assets/images';
import { theme } from '@styles/theme';

interface CartItmeProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const CartItem = ({ id, name, imageUrl, price, quantity }: CartItmeProps) => {
  return (
    <Wrapper>
      <LeftInformationWrapper>
        <CheckBox isChecked={false} onClick={() => {}} />
        <Image src={imageUrl} alt="장바구니 아이템" />
        <Title>{name}</Title>
      </LeftInformationWrapper>
      <RightInformationWrapper>
        <TrashLogo src={TRASH_LOGO} alt="장바구니 아이템 삭제/" />
        <BucketCounter kind="large" id={id} quantity={quantity} />
        <Price>{price.toLocaleString('ko-KR')} 원</Price>
      </RightInformationWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 30px 0;
  border-top: 1.5px solid ${theme.colors.whiteGray2};
`;

const LeftInformationWrapper = styled.div`
  display: flex;
`;

const Image = styled.img`
  height: 100%;

  margin: 0 20px 0 15px;
`;

const Title = styled.span`
  font-weight: 400;
  font-size: 20px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

const RightInformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  flex-direction: column;
`;

const TrashLogo = styled.img`
  cursor: pointer;
`;

const Price = styled.span`
  font-weight: 400;
  font-size: 16px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

export default CartItem;
