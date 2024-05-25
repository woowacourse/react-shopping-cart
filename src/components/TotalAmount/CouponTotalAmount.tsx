import { NotificationIcon } from '../../asset';
import { MESSAGES } from '../../constants/Messages';
import { totalPriceSelector } from '../../recoil/selectors';
import { useRecoilValue } from 'recoil';
import * as S from './TotalAmount.styled.ts';

function CouponTotalAmount() {
  const { totalAmount, deliveryFee, totalDiscount, calculatedTotalAmount } =
    useRecoilValue(totalPriceSelector('Discount'));
  return (
    <S.TotalAmountContainer>
      <S.InformationMsg>
        <S.NotificationIconImg src={NotificationIcon} alt="Notification Icon" />
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
            <S.TotalInfoLabel>{MESSAGES.totalDiscountLabel}</S.TotalInfoLabel>
            <S.TotalInfoAmount>
              {totalDiscount?.toLocaleString()}원
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

export default CouponTotalAmount;
