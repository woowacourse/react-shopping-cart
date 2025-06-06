import * as S from './PriceInfoContainer.styled';
import InfoIcon from '@assets/icons/info.svg';
import { ReactNode } from 'react';

interface PriceInfoContainerProps {
  children: ReactNode;
  freeDeliveryLimit: number;
}

export default function PriceInfoContainer({
  children,
  freeDeliveryLimit,
}: PriceInfoContainerProps) {
  return (
    <S.Container>
      <S.InfoContainer>
        <S.InfoIconImage src={InfoIcon} alt="배송비 무료 안내" />
        <S.InfoText>
          총 주문 금액이 {freeDeliveryLimit.toLocaleString()}원 이상일 경우 무료 배송됩니다.
        </S.InfoText>
      </S.InfoContainer>
      {children}
    </S.Container>
  );
}
