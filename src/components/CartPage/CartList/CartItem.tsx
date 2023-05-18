import React from 'react';
import { PRODUCT_LIST } from '@mockData/productList';
import { styled } from 'styled-components';
import BucketCounter from '@components/common/BucketCounter';
import CheckBox from '@components/common/CheckBox';
import { TRASH_LOGO } from '@assets/images';
import { theme } from '@styles/theme';

const CartItem = () => {
  return (
    <Wrapper>
      <LeftInformationWrapper>
        <CheckBox isChecked={false} onClick={() => {}} />
        <Image
          src={PRODUCT_LIST.productList[0].imageUrl}
          alt="장바구니 아이템"
        />
        <Title>[든든] 야채바삭 김말이 700g</Title>
      </LeftInformationWrapper>
      <RightInformationWrapper>
        <TrashLogo src={TRASH_LOGO} alt="장바구니 아이템 삭제/" />
        <BucketCounter kind="large" id={1} quantity={4} />
        <Price>8,440원</Price>
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
