import {
  FlexColumn,
  FlexRow,
  FlexSpaceBetween,
  WhiteSpace,
} from '@/style/common.style';

import { CART_MESSAGE } from '@/constants/message';
import { FREE_SHIPPING_CONDITION } from '@/constants/system';
import Info from '@/assets/Info.svg';
import { THEME } from '@/style/theme';
import { recipeState } from '@/store/selectors/recipeSelector';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

const CartRecipe = () => {
  const { orderPrice, shippingFee, totalPrice } = useRecoilValue(recipeState);

  return (
    <StyledRecipeWrapper>
      <StyledInfoBox>
        <img src={Info} alt="추가정보" />
        {CART_MESSAGE.freeShipping(FREE_SHIPPING_CONDITION)}
      </StyledInfoBox>
      <StyledBox>
        <StyledBetweenBox>
          <StyledBoldText>주문 금액</StyledBoldText>
          <StyledBoldText>
            {orderPrice.toLocaleString('ko-KR')}원
          </StyledBoldText>
        </StyledBetweenBox>
        <StyledBetweenBox>
          <StyledBoldText>배송비</StyledBoldText>
          <StyledBoldText>
            {shippingFee.toLocaleString('ko-KR')}원
          </StyledBoldText>
        </StyledBetweenBox>
      </StyledBox>
      <StyledBetweenBox>
        <StyledBoldText>총 결제 금액</StyledBoldText>
        <StyledBoldText>{totalPrice.toLocaleString('ko-KR')}원</StyledBoldText>
      </StyledBetweenBox>
    </StyledRecipeWrapper>
  );
};
export default CartRecipe;

const StyledRecipeWrapper = styled.div`
  ${FlexColumn}
  gap: 10px;
  background-color: ${THEME.color.white};
  padding: 16px 0;
  ${WhiteSpace}
`;

const StyledInfoBox = styled.div`
  ${FlexRow}
  align-items: flex-start;
  font-size: ${THEME.fontSize.xsmall};
  gap: 5px;
`;

const StyledBox = styled.div`
  border-top: 1px solid ${THEME.color.blackWithOpacity};
  border-bottom: 1px solid ${THEME.color.blackWithOpacity};
`;

const StyledBetweenBox = styled.div`
  ${FlexSpaceBetween}
  margin: 12px 0;
`;

const StyledBoldText = styled.span`
  font-size: ${THEME.fontSize.medium};
  font-weight: ${THEME.fontWeight.bold};
`;
