import React from 'react';
import { MESSAGES } from '../../constants/Messages';
import * as S from './TotalAmount.styled';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { PageType } from '../../types/Page';
import { useOrderCalculator } from '../../hooks/useOrderCalculator';

interface TotalAmountProps {
  type: PageType;
}

function TotalAmount({ type }: TotalAmountProps) {
  const {
    calculateOrderTotal,
    calculateDiscountWithCoupon,
    calculateDeliveryFee,
    calculateTotalWithCoupon,
  } = useOrderCalculator();

  return (
    <S.TotalAmountContainer>
      <NotificationMessage message={MESSAGES.cartNotification} />
      <S.TotalContent>
        <S.Border />

        <S.TotalInfoWrapper>
          <S.TotalInfoBox>
            <S.TotalInfoLabel>{MESSAGES.totalInfoLabel}</S.TotalInfoLabel>
            <S.TotalInfoAmount>
              {calculateOrderTotal().toLocaleString()}원
            </S.TotalInfoAmount>
          </S.TotalInfoBox>

          {type === 'order' && (
            <S.TotalInfoBox>
              <S.TotalInfoLabel>{MESSAGES.discountAmount}</S.TotalInfoLabel>
              <S.TotalInfoAmount>
                -{calculateDiscountWithCoupon().toLocaleString()}원
              </S.TotalInfoAmount>
            </S.TotalInfoBox>
          )}

          <S.TotalInfoBox>
            <S.TotalInfoLabel>{MESSAGES.deliveryFee}</S.TotalInfoLabel>
            <S.TotalInfoAmount>
              {calculateDeliveryFee().toLocaleString()}원
            </S.TotalInfoAmount>
          </S.TotalInfoBox>
        </S.TotalInfoWrapper>

        <S.Border />
      </S.TotalContent>
      <S.TotalInfoBox>
        <S.TotalInfoLabel>{MESSAGES.totalAmountLabel}</S.TotalInfoLabel>
        <S.TotalInfoAmount>
          {calculateTotalWithCoupon().toLocaleString()}원
        </S.TotalInfoAmount>
      </S.TotalInfoBox>
    </S.TotalAmountContainer>
  );
}

export default TotalAmount;
