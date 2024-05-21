import { ORDER_CONFIRM_MESSAGE } from '@/constants/message';
import { WhiteSpace } from '@/style/common.style';
import { orderedItemState } from '@/store/selectors/recipeSelector';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import { useRecoilValue } from 'recoil';

const OrderTitle = () => {
  const { itemCount, totalQuantity } = useRecoilValue(orderedItemState);

  return (
    <StyledTitleWrapper>
      <StyledTitle>주문 확인</StyledTitle>
      <StyledDetail>
        {ORDER_CONFIRM_MESSAGE.confirmOrder(itemCount, totalQuantity)}
      </StyledDetail>
      <StyledDetail>{ORDER_CONFIRM_MESSAGE.confirmPrice}</StyledDetail>
    </StyledTitleWrapper>
  );
};
export default OrderTitle;

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
  margin: 6px;
`;
