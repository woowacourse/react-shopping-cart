import { CART_MESSAGE } from '@/constants/message';
import { WhiteSpace } from '@/style/common.style';
import styled from '@emotion/styled';

const CartTitle = () => {
  const MOCK_NUM = 3;
  return (
    <StyledTitleWrapper>
      <StyledTitle>장바구니</StyledTitle>
      <StyledDetail>{CART_MESSAGE.totalProducts(MOCK_NUM)}</StyledDetail>
    </StyledTitleWrapper>
  );
};
export default CartTitle;

const StyledTitleWrapper = styled.div`
  ${WhiteSpace}
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
`;

const StyledDetail = styled.p`
  font-size: 12px;
`;
