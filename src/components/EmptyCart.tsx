import { FlexCenter, WhiteSpace } from '@/style/common.style';

import { CART_MESSAGE } from '@/constants/message';
import FullWidthButton from '@/components/Button/FullWidthButton';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

const EmptyCart = () => {
  return (
    <>
      <StyledEmptyWrapper>
        <StyledTitle>장바구니</StyledTitle>
        <StyledCenterBox>{CART_MESSAGE.emptyCart}</StyledCenterBox>
      </StyledEmptyWrapper>
      <StyledFixedBottom>
        <FullWidthButton onClick={() => {}} disable>
          주문 확인
        </FullWidthButton>
      </StyledFixedBottom>
    </>
  );
};

export default EmptyCart;

const StyledEmptyWrapper = styled.div`
  position: absolute;
  margin-top: 64px;
  ${WhiteSpace}
`;

const StyledTitle = styled.h1`
  font-size: ${theme.fontSize.large};
  font-weight: ${theme.fontWeight.bold};
  margin-top: 20px;
`;

const StyledCenterBox = styled.div`
  inset: 0;
  position: fixed;
  translate: calc(-50%, -50%);
  ${FlexCenter}
`;

const StyledFixedBottom = styled.div`
  width: 430px;
  position: fixed;
  bottom: 0;
`;
