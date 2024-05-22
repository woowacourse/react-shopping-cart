import React from 'react';
import { useRecoilValue } from 'recoil';
import { totalPriceSelector } from '../../recoil/selectors';
import { MESSAGES } from '../../constants/Messages';
import * as S from './TotalAmount.styled';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { PageType } from '../../types/Page';

interface TotalAmountProps {
  type: PageType;
}

function TotalAmount({ type }: TotalAmountProps) {
  const { totalAmount, deliveryFee, calculatedTotalAmount } =
    useRecoilValue(totalPriceSelector);

  return (
    <S.TotalAmountContainer>
      <NotificationMessage message={MESSAGES.cartNotification} />
      <S.TotalContent>
        <S.Border />

        <S.TotalInfoWrapper>
          <S.TotalInfoBox>
            <S.TotalInfoLabel>{MESSAGES.totalInfoLabel}</S.TotalInfoLabel>
            <S.TotalInfoAmount>
              {totalAmount.toLocaleString()}원
            </S.TotalInfoAmount>
          </S.TotalInfoBox>

          {type === 'order' && (
            <S.TotalInfoBox>
              <S.TotalInfoLabel>{MESSAGES.discountAmount}</S.TotalInfoLabel>
              <S.TotalInfoAmount>
                00원
                {/* {discountAmount.toLocaleString()}원 */}
              </S.TotalInfoAmount>
            </S.TotalInfoBox>
          )}

          <S.TotalInfoBox>
            <S.TotalInfoLabel>{MESSAGES.deliveryFee}</S.TotalInfoLabel>
            <S.TotalInfoAmount>
              {deliveryFee.toLocaleString()}원
            </S.TotalInfoAmount>
          </S.TotalInfoBox>
        </S.TotalInfoWrapper>

        <S.Border />
      </S.TotalContent>
      <S.TotalInfoBox>
        <S.TotalInfoLabel>{MESSAGES.totalAmountLabel}</S.TotalInfoLabel>
        <S.TotalInfoAmount>
          {calculatedTotalAmount.toLocaleString()}원
        </S.TotalInfoAmount>
      </S.TotalInfoBox>
    </S.TotalAmountContainer>
  );
}

export default TotalAmount;
