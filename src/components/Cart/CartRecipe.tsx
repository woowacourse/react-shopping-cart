import {
  FlexColumn,
  FlexRow,
  FlexSpaceBetween,
  WhiteSpace,
} from '@/style/common.style';

import { CART_MESSAGE } from '@/constants/message';
import { FREE_SHIPPING_CONDITION } from '@/constants/system';
import Info from '@/assets/Info.svg?react';
import { recipeState } from '@/store/selectors/recipeSelector';
import { selectedCouponListState } from '@/store/atoms';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import { useRecoilValue } from 'recoil';
import useTotalCouponDiscount from '@/hooks/useTotalCouponDiscount';

interface Props {
  isCoupon?: boolean;
}

const CartRecipe = ({ isCoupon = false }: Props) => {
  const { orderPrice, shippingFee, totalPrice } = useRecoilValue(recipeState);

  const selectedCoupon = useRecoilValue(selectedCouponListState);
  const date = new Date();
  const totalDiscountPrice = useTotalCouponDiscount({
    coupons: selectedCoupon,
    date,
  });

  const displayTotalPrice = isCoupon
    ? totalPrice - totalDiscountPrice
    : totalPrice;

  return (
    <StyledRecipeWrapper>
      <StyledInfoBox>
        <Info />
        {CART_MESSAGE.freeShipping(FREE_SHIPPING_CONDITION)}
      </StyledInfoBox>
      <StyledBox>
        <StyledBetweenBox>
          <StyledBoldText>주문 금액</StyledBoldText>
          <StyledBoldText>
            {orderPrice.toLocaleString('ko-KR')}원
          </StyledBoldText>
        </StyledBetweenBox>
        {isCoupon && (
          <StyledBetweenBox>
            <StyledBoldText>쿠폰 할인 금액</StyledBoldText>
            <StyledBoldText>
              -{totalDiscountPrice.toLocaleString('ko-KR')}원
            </StyledBoldText>
          </StyledBetweenBox>
        )}
        <StyledBetweenBox>
          <StyledBoldText>배송비</StyledBoldText>
          <StyledBoldText>
            {shippingFee.toLocaleString('ko-KR')}원
          </StyledBoldText>
        </StyledBetweenBox>
      </StyledBox>
      <StyledBetweenBox>
        <StyledBoldText>총 결제 금액</StyledBoldText>
        <StyledBoldText>
          {displayTotalPrice.toLocaleString('ko-KR')}원
        </StyledBoldText>
      </StyledBetweenBox>
    </StyledRecipeWrapper>
  );
};
export default CartRecipe;

const StyledRecipeWrapper = styled.div`
  ${FlexColumn}
  gap: 10px;
  background-color: ${theme.color.white};
  padding: 16px 0;
  ${WhiteSpace}
`;

const StyledInfoBox = styled.div`
  ${FlexRow}
  align-items: flex-start;
  font-size: ${theme.fontSize.xsmall};
  gap: 5px;
`;

const StyledBox = styled.div`
  border-top: 1px solid ${theme.color.blackWithOpacity};
  border-bottom: 1px solid ${theme.color.blackWithOpacity};
`;

const StyledBetweenBox = styled.div`
  ${FlexSpaceBetween}
  margin: 20px 0;
`;

const StyledBoldText = styled.span`
  font-size: ${theme.fontSize.medium};
  font-weight: ${theme.fontWeight.bold};
`;
