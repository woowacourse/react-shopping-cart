import React from 'react';
import { useRecoilValue } from 'recoil';
import { totalPriceSelector } from '../../recoil/selectors';
import { NotificationIcon } from '../../asset';
import { MESSAGES } from '../../constants/Messages';
import * as S from './TotalAmount.styled';

function TotalAmount() {
  const { totalAmount, deliveryFee, calculatedTotalAmount } =
    useRecoilValue(totalPriceSelector);

  return (
    <S.TotalAmountContainer>
      <S.InformationMsg>
        <S.NotificationIconImg src={NotificationIcon} />
        {MESSAGES.cartNotification}
      </S.InformationMsg>
      <S.TotalContent>
        <S.Border />

        <S.TotalInfoWrapper>
          <S.TotalInfoBox>
            <S.TotalInfoLabel>{MESSAGES.totalInfoLabel}</S.TotalInfoLabel>
            <S.TotalInfoAmount>
              {totalAmount.toLocaleString()}원
            </S.TotalInfoAmount>
          </S.TotalInfoBox>

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
