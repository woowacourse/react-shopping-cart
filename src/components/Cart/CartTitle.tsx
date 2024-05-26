import { CART_MESSAGE } from '@/constants/message';
import { WhiteSpace } from '@/style/common.style';
import { cartListState } from '@/store/atoms';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import { useRecoilValue } from 'recoil';

const CartTitle = () => {
  const cartItemCount = useRecoilValue(cartListState);

  return (
    <StyledTitleWrapper>
      <StyledTitle>장바구니</StyledTitle>
      <StyledDetail>
        {CART_MESSAGE.totalProducts(cartItemCount.length)}
      </StyledDetail>
    </StyledTitleWrapper>
  );
};
export default CartTitle;

const StyledTitleWrapper = styled.div`
  ${WhiteSpace}
`;

const StyledTitle = styled.h1`
  font-size: ${theme.fontSize.large};
  font-weight: ${theme.fontWeight.bold};
  margin-top: 20px;
`;

const StyledDetail = styled.p`
  font-size: ${theme.fontSize.xsmall};
`;
